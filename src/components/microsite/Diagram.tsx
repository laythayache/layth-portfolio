import { ArrowRight } from "lucide-react";
import type { TranslationFlowNode } from "@/content/omnisign";

interface DiagramProps {
  nodes: TranslationFlowNode[];
}

export default function Diagram({ nodes }: DiagramProps) {
  return (
    <div
      className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-0"
      role="img"
      aria-label="Translation flow: Sign input is processed by the federated model and output as text and speech"
    >
      {nodes.map((node, i) => (
        <div key={node.label} className="flex items-center gap-0 sm:flex-1">
          <div className="flex flex-1 flex-col items-center gap-1 border border-border bg-surface-raised p-4 text-center">
            <span className="font-mono text-xs font-semibold text-text-primary">
              {node.label}
            </span>
            <span className="font-mono text-[11px] text-text-muted">
              {node.detail}
            </span>
          </div>
          {i < nodes.length - 1 && (
            <ArrowRight
              size={16}
              className="mx-2 shrink-0 rotate-90 text-text-muted sm:rotate-0"
            />
          )}
        </div>
      ))}
    </div>
  );
}
