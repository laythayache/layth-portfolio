export type ExperimentStatus = "active" | "researching" | "paused";

export interface Experiment {
  id: string;
  title: string;
  description: string;
  status: ExperimentStatus;
  updated: string;
}

export const experiments: Experiment[] = [
  {
    id: "arabic-rag",
    title: "Arabic-first RAG pipeline for multilingual retrieval",
    description:
      "Building a retrieval-augmented generation pipeline that treats Arabic as a first-class language, not a translation afterthought.",
    status: "active",
    updated: "2026-02-10",
  },
  {
    id: "change-detection-bench",
    title: "Change detection benchmarks across Lebanese media sources",
    description:
      "Establishing baseline metrics for how frequently and significantly content changes across monitored public sources.",
    status: "active",
    updated: "2026-02-08",
  },
  {
    id: "edge-inference",
    title: "Edge inference optimization for real-time gesture classification",
    description:
      "Reducing model size and inference latency for on-device sign language recognition on mid-range hardware.",
    status: "researching",
    updated: "2026-01-25",
  },
  {
    id: "structured-extraction",
    title: "Structured extraction from unstructured government documents",
    description:
      "Parsing and normalizing tabular and semi-structured data from PDFs and scanned official publications.",
    status: "paused",
    updated: "2026-01-10",
  },
];
