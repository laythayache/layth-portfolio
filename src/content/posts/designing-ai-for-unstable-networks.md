---
title: Designing AI Systems for Unstable Networks
date: 2026-01-22
excerpt: Practical patterns for keeping AI products usable when connectivity and latency are unreliable.
tags: [AI, Networking, Reliability]
coverImage: /diagrams/omnisign-architecture.svg
coverImageAlt: OmniSign local-first architecture diagram for unstable networks
---

The supermarket in Côte d'Ivoire had cameras, an intermittent internet connection, and a government privacy compliance requirement.

The cameras monitored store activity — foot traffic, entry and exit patterns, operational monitoring. The compliance requirement was real: any system processing footage of customers had to meet local data protection standards, which meant sensitive data could not leave the premises. The internet connection was unreliable enough that "send frames to a cloud API" was off the table on both legal and practical grounds.

This was the deployment context for PrivacyGuard, the edge video anonymization system I built. The constraint wasn't a technical challenge to route around. It was the whole design premise.

Most AI systems I encountered before building it shared the same assumption: you have a server. You have connectivity. You have a place to send the data.

In a supermarket in Abidjan, you have none of those guarantees. Here is what that actually required.

## The framing that changes everything: connectivity as a budget, not a given.

Most AI architectures treat network connectivity the way legacy applications treated disk space: assumed present, sized for average use, not designed for absence.

The more accurate mental model for edge deployments — especially in West Africa and the Middle East, where infrastructure volatility is a baseline condition — is to treat connectivity like battery life: finite, variable, and worth budgeting against.

| Infrastructure reality | Côte d'Ivoire context |
|---|---|
| Grid power reliability | Intermittent; generator backup common |
| Internet continuity | Mobile data primary; fixed line unreliable |
| Cloud API round-trip | Unusable as primary path |
| Data residency requirement | Government compliance: no egress |
| Target hardware budget | Sub-$50 edge device |

This changes how you answer every architectural question.

**Where does inference run?** If inference requires a network call, any network interruption makes the feature unavailable. For PrivacyGuard, inference runs entirely on-device: YOLOv8-nano via ONNX Runtime on a Raspberry Pi 4, 25–30 FPS at 640×480, zero cloud calls, zero telemetry. The data never leaves the device because the architecture never created a path for it to leave.

**What is the compliance posture?** If you send a frame of a customer in a store to a cloud API, you have already violated the compliance premise before any anonymization happens. GDPR Article 5 and similar frameworks require data minimization at the point of collection, not after transmission. Edge-first inference is not a performance optimization — for privacy use cases, it is the only compliant architecture.

**What happens when the connection drops?** If your system's failure mode under network loss is "everything stops," you have designed a system that fails regularly in the environments where it matters most. The answer has to be local processing that continues regardless of network state, with sync or reporting that resumes when connectivity returns.

## The deployment architecture: RTSP in, anonymized frames out.

The supermarket's cameras fed RTSP streams to a central recording system. PrivacyGuard was inserted into this pipeline as a processing layer between the cameras and the storage system — consuming the raw RTSP stream, running detection and anonymization on each frame, and writing the anonymized output to disk. No frame containing identifiable information was ever written to storage. No frame containing identifiable information ever touched a network interface.

The edge device receiving the RTSP stream was a Raspberry Pi 4. The processing pipeline: YOLOv8-nano via ONNX Runtime, running detection and applying Gaussian blur masking in a single pass per frame, at 25–30 FPS on CPU-only hardware. The device cost $35. The only network traffic the device produced was the RTSP ingest from the local camera network — all of which stayed on-premises.

This architecture means there is no point in the data flow where a network request could expose identifiable information to an external party. Not by accident. By construction.

## Local-first inference is not a compromise — it is the correct architecture for privacy.

The common framing of edge AI emphasizes latency and cost. For privacy applications, the constraint is more fundamental.

A cloud API call with a frame of video is a data egress event. The sensitive content has left the premises. Anonymization that happens in the cloud does not satisfy "data never leaves the premises" — it satisfies "data leaves the premises and is then anonymized somewhere else." Those are legally and architecturally different.

PrivacyGuard eliminates the egress event entirely. Detection and anonymization run on the edge device. The anonymized output stream is the only artifact that ever exists beyond the camera sensor. There is no frame containing identifiable information that ever touches a network.

This required accepting model size constraints. YOLOv8-nano rather than a larger server-side model. Acceptable recall at standard operating distances, documented miss rates at extreme distances or occlusion. The tradeoff was explicit and designed, not discovered in production.

The result: continuous operation through every power fluctuation and connectivity interruption during the deployment period, because the anonymization pipeline had no dependency on either.

## Handling infrastructure interruptions gracefully.

Power interruptions in edge deployments — whether a generator switching over or a circuit breaker tripping — create a specific failure mode: processes don't exit cleanly, connections close ungracefully, and services restart in undefined state.

Three patterns address this:

**Idempotent operations.** Any write that might be interrupted mid-execution must be safe to replay. For PrivacyGuard's audit logging — per-frame detection metadata written for compliance purposes — every log write is append-only with a frame identifier. A restart that replays the last N frames produces duplicate log entries that can be deduplicated, not corrupted or missing entries.

**Checkpoint-based batch processing.** For overnight batch anonymization of recorded footage, the pipeline writes checkpoints after every completed segment. A power interruption mid-batch resumes from the last checkpoint, not from the beginning. Without this, a twelve-hour batch run is a twelve-hour restart risk.

**Startup validation.** Services that restart after unclean shutdown validate their state before resuming. The audit log is checked for consistency. The model file is verified against a stored hash. Only after validation does the pipeline begin processing new frames. This matters for compliance: a restart that silently resumes on a corrupted model file could produce frames where identifiable information was not actually masked, with an audit log showing it was. Startup validation prevents that class of silent compliance failure.

## For AI systems that do produce outbound data: the async sync pattern.

PrivacyGuard produces no outbound data by design. But many AI systems in edge environments do — analytics pipelines, monitoring dashboards, reporting systems that need to sync aggregated outputs when connectivity is available.

For those systems, synchronous network writes are the wrong default. A write that times out leaves state ambiguous. A write that blocks the user-facing thread degrades the product every time the connection is slow.

The better default is an asynchronous outbound queue:

```python
import json
import time
import sqlite3

class OutboundQueue:
    """Persistent queue that survives process restarts and power interruptions."""

    def __init__(self, db_path: str):
        self.db_path = db_path
        with sqlite3.connect(db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS queue (
                    id TEXT PRIMARY KEY,
                    payload TEXT NOT NULL,
                    attempts INTEGER DEFAULT 0,
                    created_at REAL NOT NULL
                )
            """)

    def enqueue(self, item_id: str, payload: dict):
        """Write locally and return immediately. Never blocks on network."""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute(
                "INSERT OR IGNORE INTO queue VALUES (?, ?, 0, ?)",
                (item_id, json.dumps(payload), time.time())
            )

    def drain(self, send_fn, max_attempts: int = 5):
        """Called by background worker when connectivity is available."""
        with sqlite3.connect(self.db_path) as conn:
            rows = conn.execute(
                "SELECT id, payload, attempts FROM queue ORDER BY created_at"
            ).fetchall()

        for row_id, payload_json, attempts in rows:
            if attempts >= max_attempts:
                continue  # dead-letter: needs manual inspection
            try:
                if send_fn(json.loads(payload_json)):
                    with sqlite3.connect(self.db_path) as conn:
                        conn.execute("DELETE FROM queue WHERE id = ?", (row_id,))
            except Exception:
                with sqlite3.connect(self.db_path) as conn:
                    conn.execute(
                        "UPDATE queue SET attempts = attempts + 1 WHERE id = ?",
                        (row_id,)
                    )
```

![Local-first data architecture](/diagrams/local-first-sync.svg)

The invariants this enforces:
- User-facing operations never wait on network calls
- Queue items survive process restarts (SQLite persists to disk)
- Sync state is visible and non-blocking
- Failed items increment an attempt counter rather than being silently dropped

The key implementation detail: `INSERT OR IGNORE` makes every enqueue idempotent. Replaying the same item after a restart produces one queue entry, not two.

## Communicating degraded state honestly.

The most common mistake in systems designed for unreliable environments is invisible failure. A spinner that never resolves. A result that's actually from twelve hours ago. A confidence score that doesn't reflect the fact that you're running a smaller model.

PrivacyGuard surfaces its operational state explicitly. If the detection model is running in a reduced-accuracy configuration, the audit log records it. If frame processing falls behind real-time throughput, the output metadata includes the processing lag. Nothing is hidden from the downstream compliance review.

For AI systems more broadly, this principle transfers:

- "Running locally — lower accuracy mode" is better than silently serving degraded output
- "Last synced 22 minutes ago" is better than showing data as if it were current
- "Low confidence — flag for review" in the output record is better than accepting the detection silently

Users and compliance reviewers can work with honest system state. They cannot work with inaccurate signals of reliability.

## What I'd do differently.

**Multi-stream orchestration.** PrivacyGuard handles single video streams well. The supermarket deployment ran one stream. Coordinating four or eight RTSP streams through a single Raspberry Pi — which is the realistic requirement for a full store deployment — requires stream multiplexing and resource scheduling that the current architecture doesn't address. A dedicated edge orchestration layer (something like a lightweight task queue per stream) is the next engineering problem.

**Sync lag as a monitored metric.** For systems that do produce outbound data, queue length tells you how much is pending but not how old it is. An item that has been in the queue for six hours is more urgent than ten items that are each five minutes old. Queue age at the p95 percentile is the metric I'd add to any monitoring stack for async sync systems.

**Formal compliance documentation as a system output.** The government compliance review required producing a structured evidence package: a data flow diagram demonstrating zero egress, per-frame audit log samples showing consistent masking application, and a written architecture description confirming on-device processing. I assembled this manually from system documentation and audit log exports. In a system designed for repeated compliance reviews — or deployment across multiple sites — this evidence should be generated automatically as a pipeline output: a compliance report generated on demand from the audit logs, not assembled by hand each time. The audit logs contain all the necessary data. The only missing component is a reporting layer on top of them.

The constraint of building for unreliable infrastructure forces better architecture discipline. Systems that run on edge hardware in West Africa, with no stable internet and real compliance requirements, have no room for architectural assumptions that only hold in ideal conditions. The discipline transfers to every deployment context.
