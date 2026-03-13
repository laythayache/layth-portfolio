---
title: Lessons from Telecom Engineering to AI Systems
date: 2025-11-05
excerpt: Working on telecom infrastructure changed how I approach reliability, monitoring, and risk in AI products.
tags: [Infrastructure, Telecom, AI]
coverImage: /diagrams/pub-info-architecture.svg
---

The data I was given to build a predictive maintenance system for Lebanon's telephone lines was written on notepads.

Arabic. English. Sometimes both in the same cell. Dates formatted three different ways across three different technicians. Fault codes that had been reassigned mid-decade without documentation. Thousands of records — each one representing a telephone line, a technician visit, a failure event — in a format that no machine learning pipeline could touch.

Before I could build anything, I had to understand what the data actually meant. That required making close to a thousand phone calls to verify individual records against reality on the ground. Not the kind of work that appears in a model accuracy table. The kind of work that determines whether a model accuracy table means anything at all.

That project, building a predictive maintenance AI for OGERO's telephone line infrastructure, taught me more about AI reliability than any benchmark paper I've read since.

## The data problem is always a reliability problem.

In telecom, a fault prediction system is only as reliable as the fault history it was trained on. If the historical data is inconsistent — and ours was, deeply — the model learns to reproduce the inconsistencies, not the underlying physics of cable degradation.

This is not a "data cleaning" problem. It is a reliability engineering problem. Garbage in doesn't just mean garbage out — it means outputs that look plausible but predict the wrong things, in the wrong directions, for the wrong reasons.

The cleaning process took weeks. Every reassigned fault code had to be traced and relabeled. Every technician-reported field that overlapped with a database field had to be reconciled. Records where the reported outcome contradicted the infrastructure data required direct verification — hence the phone calls.

The lesson: ground truth requires going to ground. No amount of statistical imputation fixes records that are simply wrong. At some scale, you have to verify against reality.

## Observability needs to reach the thing that matters, not just the infrastructure around it.

After the data was cleaned, we built the predictive maintenance model — a gradient boosting classifier trained on line characteristics, fault history, and infrastructure metadata. Then we built the monitoring layer.

The initial instinct was standard: track model performance, log predictions, alert on errors. This is the right list, but it monitors the wrong layer.

What mattered to the team at OGERO wasn't whether the model was running. It was whether the model's predictions were leading to the right interventions — whether lines flagged as high-risk were being serviced before they failed, and whether the predictions were accurate enough to trust as a scheduling input.

That required a different monitoring surface. We built an analytics dashboard tracking:

| Metric | What it measures | Why it matters |
|---|---|---|
| Lines flagged high-risk this week | Model output | Is the model producing actionable predictions? |
| Flagged lines serviced within 7 days | Operational follow-through | Are predictions being acted on? |
| Flagged lines that failed before service | Miss rate | Is the prediction window long enough? |
| Unflagged lines that failed (surprise failures) | False negative rate | What is the model missing? |
| Prediction confidence distribution | Model calibration | Is the model drifting? |

The surprise failure rate — lines that went down without being flagged — was the metric that actually told us whether the system was working. Not accuracy on a held-out test set. The rate of surprises in production.

By the end of the engagement, we had predicted a meaningful number of line failures before they occurred — lines that were serviced before going down because the model flagged them. That's the metric that justified the system. Not the F1 score.

## A chatbot that knows what's about to break is a different product than one that reports what already broke.

Alongside the dashboard, we built a chatbot interface that connected to the predictive model and the KPI layer.

The difference between a reporting chatbot and a predictive chatbot is the temporal direction of the data. Most operational chatbots answer questions about past state: what failed last month, which lines had the most incidents, which technicians had the highest call-backs. Useful, but reactive.

The predictive chatbot we built answered questions about future state: which lines are currently in the top risk tier, which regions have the highest concentration of degraded lines, what the expected failure rate is for the next two weeks if current service rates hold.

That temporal direction change made the product qualitatively different. A maintenance team can act on future state. It can only document past state.

The architecture requirement this creates: the model's predictions have to be fresh enough to be actionable. A prediction that is three weeks stale is worse than no prediction — it creates false confidence in a state that may have already changed. Freshness is a first-class reliability property for predictive systems, not an afterthought.

## Circuit breakers: preventing cascade failures in AI pipelines.

One pattern that came out of the data pipeline work — not specific to the OGERO project, but validated by it — is the circuit breaker applied to AI inference clients.

When a data pipeline depends on an upstream source that has uneven availability (APIs, external data feeds, infrastructure systems that go offline during maintenance), the default failure mode is retry cascade: the pipeline keeps hammering the unavailable source, which delays other work and sometimes makes the outage worse.

A circuit breaker prevents this:

```python
import time
from enum import Enum

class State(Enum):
    CLOSED = "closed"        # normal: requests pass through
    OPEN = "open"            # failing: requests blocked
    HALF_OPEN = "half_open"  # probing: one test request allowed

class CircuitBreaker:
    def __init__(self, failure_threshold=3, reset_timeout=30):
        self.state = State.CLOSED
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.reset_timeout = reset_timeout
        self._opened_at = None

    def call(self, fn, *args, **kwargs):
        if self.state == State.OPEN:
            if time.time() - self._opened_at >= self.reset_timeout:
                self.state = State.HALF_OPEN
            else:
                raise RuntimeError("Circuit open — using cached state")

        try:
            result = fn(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise e

    def _on_success(self):
        self.failure_count = 0
        self.state = State.CLOSED

    def _on_failure(self):
        self.failure_count += 1
        if self.failure_count >= self.failure_threshold:
            self.state = State.OPEN
            self._opened_at = time.time()
```

![Circuit breaker state machine](/diagrams/circuit-breaker-states.svg)

Three states, two transition conditions. The circuit opens after three consecutive failures, blocks requests for thirty seconds, then allows a single probe. This prevents cascade while keeping the failure mode legible — the pipeline knows it is operating on cached or degraded data, rather than silently degrading without knowing.

## Recovery speed matters more than failure prevention.

The counter-intuitive lesson from telecom operations: past a certain threshold of reliability engineering, additional investment in failure prevention has diminishing returns. Investment in recovery speed compounds better.

If your AI system has fifteen components, each at 99.9% availability, the probability all fifteen are available simultaneously is 99.9%^15 ≈ 98.5%. You can add nines to individual components indefinitely and still have meaningful multi-component outages several times per year.

Halving your mean time to recovery — through practiced rollback, clearer alerting, better runbooks — halves the user-visible impact of every future incident. That math scales better than trying to prevent failures that statistical reality makes inevitable.

For the predictive maintenance system, the practical version of this was: can we retrain and redeploy the model quickly when the data distribution shifts? Telephone line infrastructure changes — new cables, retired equipment, different technician populations. A model trained on 2022 data may need retraining in 2024. Having a repeatable training pipeline with tracked experiments meant retraining was measured in hours, not days.

## What I'd do differently.

The phone call verification process — close to a thousand calls to validate records — was the most valuable and least automated part of the engagement. It was also the bottleneck.

If I were building this again, I would front-load data quality tooling before modeling begins:

- **Automated anomaly detection on ingestion**: flag records where fault codes, dates, or outcome fields fall outside expected distributions before they enter the training set
- **Confidence scoring per record**: track how many fields were imputed vs. directly verified, and weight training samples accordingly
- **Versioned ground truth**: every manual verification call was knowledge that should have been stored as labeled data, not just used to clean a single field in a single record

The phone calls generated more signal than the original data. Capturing that signal systematically would have been worth more than the cleaned dataset alone.

Telecom engineering taught me that the hardest reliability problems are rarely in the model. They are in the data, the monitoring, and the decision of what to measure in the first place.
