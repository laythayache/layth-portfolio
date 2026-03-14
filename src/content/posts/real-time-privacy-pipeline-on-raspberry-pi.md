---
title: "Real-Time Video Anonymization at 30 FPS on a $35 Computer"
date: 2026-03-13
excerpt: How I built PrivacyGuard — a zero-cloud, GDPR-compliant video de-identification pipeline running on Raspberry Pi 4 using YOLOv8-nano and ONNX Runtime.
tags: [Privacy, Edge AI, Computer Vision, Open Source, GDPR]
coverImage: /og-default.jpg
coverImageAlt: Open Graph image for Layth Ayache AI systems portfolio
---

Most privacy pipelines I encountered before building PrivacyGuard shared the same assumption: you have a server.

They pipe video frames to the cloud, process them there, and return anonymized output. This works well in San Francisco. It works poorly in Beirut, where internet goes out without warning, and it works not at all in environments where the entire point is that sensitive data must never leave the premises.

The constraint I was designing for was different: **detect and anonymize faces, persons, and license plates entirely on-device, in real time, on hardware that costs $35.**

Here is what that actually required, and what I learned building it.

## Why edge matters for privacy

The framing of "edge AI" usually emphasizes latency or cost. For privacy use cases, the constraint is more fundamental.

If you pipe a frame of a hospital corridor to a cloud API, you have already violated the premise. The sensitive data left the facility. The compliance posture is gone before the anonymization even happens. GDPR Article 5 requires data minimization — not "minimize after you send it somewhere." The pipeline itself must be zero-egress.

This rules out every major commercial API (AWS Rekognition, Google Video Intelligence, Azure Video Analyzer). They are all cloud-first by design. For edge-first privacy, you are building from scratch.

## The hardware constraint

Raspberry Pi 4 has a quad-core ARM Cortex-A72 at 1.8GHz and 4–8GB of RAM. No GPU. No NPU. Pure CPU inference.

This is a meaningful constraint. A standard YOLOv8s model running on CPU produces about 3–5 FPS on this hardware — unusable for real-time video. The common response is to reach for a more powerful device. I treated it as a design parameter instead.

The target was 25–30 FPS at 640×480. Anything below that produces visible lag in live video feeds, which breaks the usability of monitoring workflows.

## Model selection: nano is not a compromise

YOLOv8 comes in five sizes: nano, small, medium, large, extra-large. The instinct is to use the largest model you can afford. For edge deployment, this is the wrong instinct.

YOLOv8-nano has 3.2M parameters. YOLOv8-small has 11.2M. On Raspberry Pi 4, the difference in inference time is roughly 4x. The difference in detection accuracy for faces and full-body persons at standard video resolutions is much smaller — nano achieves acceptable recall at confidence thresholds above 0.4 for the primary use cases.

The tradeoff I accepted: very small faces at distance (under ~20px face height in frame) and heavily occluded license plates have higher miss rates with nano. For the core use case — anonymizing people and plates in surveillance footage at normal operating distances — nano is sufficient.

This is a deliberate tradeoff, documented in the project. Pretending the tradeoff doesn't exist is how you ship a system that fails silently in production.

## ONNX Runtime: eliminating the framework overhead

PyTorch inference on CPU carries significant overhead from Python bindings and dynamic computation graphs. Exporting to ONNX and running via ONNX Runtime cuts inference time by 30–40% on CPU.

The export is one command:

```python
model = YOLO("yolov8n.pt")
model.export(format="onnx", opset=12, simplify=True)
```

ONNX Runtime then loads the `.onnx` file directly, bypassing PyTorch entirely at inference time. This is the single biggest performance lever for CPU-only deployments. It also reduces the binary footprint — no PyTorch dependency in production means a significantly smaller install.

Combined with input resolution capped at 640×480 and frame skipping during batch processing, this is what gets PrivacyGuard to 25–30 FPS on Raspberry Pi 4.

## Three masking modes and why they exist

Anonymization is not a single operation. Different deployment contexts have different requirements:

**Gaussian blur** — default mode. Faces and license plates become recognizable as human/text-shaped blobs, which preserves spatial context while removing identity. Preferred for dashcam footage and public space recording where scene understanding matters.

**Pixelation** — coarser than blur, lower compute cost, and more obviously "redacted" to human viewers. Useful when the output will be reviewed by humans who need to understand that something was masked.

**Solid fill** — complete occlusion with a black or colored rectangle. Required when the anonymized video will be machine-processed downstream and you cannot risk any residual signal leaking through the masking operation.

Each mode is a one-line configuration change. The pipeline applies the same detection pass regardless of masking mode — the detector runs once per frame.

## Arabic license plates and the Middle Eastern market gap

Most open-source privacy pipelines are trained on Western datasets. Arabic license plates have different dimensions, font characteristics, and character distributions than European or North American plates. Standard license plate detectors trained on COCO or similar datasets have significantly reduced recall on Gulf Cooperation Council and Levantine plate formats.

PrivacyGuard includes regional detectors fine-tuned for Arabic plate formats. This was a specific requirement for the Lebanon deployment context — OGERO vehicles, government fleet footage, and public road recording all involve Arabic-format plates.

The bilingual document processor handles a related problem: privacy redaction in document images where text may be Arabic, English, or mixed. Bounding box detection for text regions uses a different model path than the video pipeline.

## Audit logging for compliance

GDPR compliance is not just about anonymizing data — it is about demonstrating that you anonymized it. Article 5(2) requires accountability: you must be able to show that your processing complies with the regulation.

PrivacyGuard writes per-frame detection metadata to a structured log:

```json
{
  "frame": 1247,
  "timestamp_ms": 41567,
  "detections": [
    { "class": "face", "confidence": 0.87, "masked": true, "mode": "blur" },
    { "class": "license_plate", "confidence": 0.91, "masked": true, "mode": "blur" }
  ]
}
```

This gives you an audit trail: every frame, every detection, every masking operation. During a compliance audit, you can demonstrate not just that the output is anonymized but that the anonymization process was applied consistently and completely.

## What I would do differently

The nano model's miss rate on distant or occluded subjects is the main limitation I would address next. A two-stage detector — a fast nano pass to identify regions of interest, followed by a higher-accuracy model on those crops only — would improve recall without paying the full cost of a larger model on every frame. The math works: if nano correctly identifies the rough location of 95% of faces, running a more accurate model only on those crops costs far less than running it on every frame.

Multi-camera orchestration is the other unsolved problem. PrivacyGuard handles single streams well. Coordinating four or eight RTSP streams through a single Raspberry Pi or small edge cluster requires stream multiplexing and resource scheduling that the current architecture does not handle.

## Using it

PrivacyGuard is MIT-licensed and free permanently. It installs via pip and runs on any Python 3.9+ environment:

```bash
pip install privacyguard
```

The repository is at [github.com/laythayache/PrivacyGuard](https://github.com/laythayache/PrivacyGuard). Full architecture notes and deployment guide are in the project documentation at [laythayache.com/projects/privacy-guard](https://laythayache.com/projects/privacy-guard).

If you are working on edge deployment or privacy compliance in resource-constrained environments, I am reachable at laythayache5@gmail.com.
