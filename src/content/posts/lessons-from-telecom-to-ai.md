---
title: Lessons from Telecom Engineering to AI Systems
date: 2025-11-05
excerpt: Working on telecom infrastructure changed how I approach reliability, monitoring, and risk in AI products.
tags: [Infrastructure, Telecom, AI]
coverImage: /diagrams/pub-info-architecture.svg
coverImageAlt: Telecom public information architecture diagram
---

The data I was given to build a predictive maintenance system for Lebanon's telephone lines was written on notepads.

Arabic. English. Sometimes both in the same cell. Dates formatted three different ways across three different technicians. Fault codes that had been reassigned mid-decade without documentation. Thousands of records — each one representing a telephone line, a technician visit, a failure event — in a format that no machine learning pipeline could touch.

Before I could build anything, I had to understand what the data actually meant. That required making close to a thousand phone calls to verify individual records against reality on the ground. Not the kind of work that appears in a model accuracy table. The kind of work that determines whether a model accuracy table means anything at all.

That project, building a predictive maintenance AI for OGERO's telephone line infrastructure, taught me more about AI reliability than any benchmark paper I've read since.

## The architecture: what the system actually does.

The final system has four components that feed into each other.

**Feature pipeline.** Each telephone line record is enriched with six feature categories before it enters the model: line age, cable type, cable length, geographic area, weather correlation data for that region, and historical damage patterns for similar lines in the same zone. The weather correlation was not in the original dataset at all — it had to be joined in from external sources, which meant the data problem was not just about cleaning what existed but about identifying what was missing.

**Batch prediction engine.** A gradient boosting classifier runs on a fixed schedule against the full enriched line database. The output is a risk score per line, bucketed into tiers: high-risk (expected failure within days), elevated (expected failure within weeks), and nominal. The batch approach was a deliberate choice. Real-time prediction for a static infrastructure dataset adds complexity without adding value — telephone lines do not change their risk profile between minutes.

**LLM translation layer.** Raw risk scores are not useful to the executives and operational supervisors who act on this system. The prediction outputs are translated into natural language summaries using a locally-hosted Ollama instance: "Lines in the northern Beirut corridor are showing elevated failure probability over the next 10–14 days, concentrated in sectors with cable age above 18 years. Recommend prioritizing service dispatch to zones 4 and 7 before Thursday."

The LLM is self-hosted, on-premises, air-gapped from external APIs. This was not a cost decision. OGERO's infrastructure data — fault histories, geographic coverage maps, line-level technical specifications — is national telecom infrastructure data. Sending it to a commercial API endpoint is not an option that a serious security posture permits. The architectural choice to run Ollama locally was made before we wrote a line of model code.

**Analytics dashboard.** The chatbot and summary outputs surface through a dashboard that tracks operational KPIs alongside the model outputs. Executives use this for budget allocation and infrastructure planning decisions. Operational supervisors use it to schedule field technician dispatch.

The system is currently in active testing. OGERO supervisors retain final authority on all dispatch decisions — the AI informs, it does not decide. That human-in-the-loop constraint was a design requirement, not a limitation.

## The data problem is always a reliability problem.

In telecom, a fault prediction system is only as reliable as the fault history it was trained on. If the historical data is inconsistent — and ours was, deeply — the model learns to reproduce the inconsistencies, not the underlying physics of cable degradation.

This is not a "data cleaning" problem. It is a reliability engineering problem. Garbage in doesn't just mean garbage out — it means outputs that look plausible but predict the wrong things, in the wrong directions, for the wrong reasons.

Every reassigned fault code had to be traced and relabeled. Every technician-reported field that overlapped with a database field had to be reconciled. Records where the reported outcome contradicted the infrastructure data required direct verification — hence the phone calls. The process took weeks and produced a dataset that bore little resemblance to what we started with.

The lesson: ground truth requires going to ground. No amount of statistical imputation fixes records that are simply wrong.

## Observability has to reach what executives actually act on.

After the model was built, the initial monitoring instinct was standard: track model performance, log predictions, alert on errors. This monitors the right things at the wrong layer.

What mattered to OGERO's supervisors wasn't whether the model was running. It was whether the model's predictions were leading to the right field interventions — whether lines flagged as high-risk were being serviced before they failed, and whether the predictions were accurate enough to use as a budget planning input.

| Metric | What it measures | Why it matters |
|---|---|---|
| Lines flagged high-risk this week | Model output volume | Is the model producing actionable predictions? |
| Flagged lines serviced within 7 days | Operational follow-through | Are predictions being acted on? |
| Flagged lines that failed before service | Miss rate | Is the prediction window long enough? |
| Unflagged lines that failed (surprise failures) | False negative rate | What is the model missing? |
| Prediction confidence distribution by region | Model calibration drift | Is geographic distribution shifting? |

The surprise failure rate — lines that went down without being flagged — was the metric that actually told us whether the system was working. Not accuracy on a held-out test set. The rate of surprises in production, measured in real infrastructure impact.

## The self-hosted LLM decision is an architecture decision, not a feature.

The choice to run Ollama locally rather than call an external LLM API deserves more explanation, because it is the most consequential architectural decision in the stack and the one most likely to be skipped over.

National telecom infrastructure data has a specific risk profile. Fault histories reveal where the physical network is degraded. Geographic coverage data reveals where service is being allocated and where it isn't. Line-level technical specifications can reveal infrastructure investment patterns. This data, in aggregate, constitutes a detailed picture of Lebanon's telecommunications backbone.

Sending this to any external API — regardless of the vendor's privacy policy — creates a data flow that exits the OGERO security perimeter. That flow is not acceptable.

The performance cost of running Ollama locally on the dashboard server is real. The response latency for natural language summaries is higher than a cloud API call. The model quality ceiling is lower than what GPT-4 would produce. Both of these tradeoffs were accepted explicitly, because the alternative was an architecture that could not be deployed.

This is what architect-level security thinking looks like in practice: not "which LLM produces the best summaries," but "which LLMs can we legally and operationally use given the data classification."

## Freshness is a first-class reliability property.

The batch prediction schedule creates a freshness constraint that becomes a reliability property of the system. A prediction that is three weeks stale is worse than no prediction — it creates false confidence in a risk assessment that may no longer reflect current conditions. Infrastructure changes between runs: new cables get laid, old cables get repaired, weather events shift regional risk profiles.

This means the batch schedule is not a performance parameter. It is a product contract with the executives who use the system. If a supervisor makes a budget allocation decision based on a two-week-old risk snapshot, and a line fails in the interval, the system failed them — not because the model was wrong, but because the prediction was stale.

The practical consequence: retraining cadence and prediction freshness are SLA parameters that belong in the product specification, not in the model documentation.

## What I'd do differently.

**Automate the ground truth capture from day one.** The phone call verification process — close to a thousand calls — was the most valuable and least automated part of the engagement. Every verified record was knowledge that should have been stored as labeled data with provenance metadata, not used to patch a field and then discarded. A proper data collection layer with explicit confidence scores per record would have turned the verification effort into a training asset.

**Schema contract between ingestion and training.** The feature pipeline and the training pipeline were built iteratively, which meant schema changes in ingestion required manual updates in training. A formal schema contract with validation at the boundary — Pydantic, Great Expectations, or even structured assertions — would have caught integration failures immediately rather than letting them produce silent training errors.

**Separate the LLM summary cadence from the prediction cadence.** Currently, summaries are generated as part of the batch prediction run. For a use case where executives check the dashboard weekly, generating summaries daily is wasted compute. For a use case where field dispatchers check daily, weekly summaries are stale. These are different cadences with different freshness requirements and they should be decoupled.

The hardest reliability problems in AI systems are rarely in the model. They are in the data, the monitoring, and the decision of what to measure in the first place. OGERO's telephone lines taught me all three.
