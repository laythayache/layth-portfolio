"use client";

import { motion } from "framer-motion";
import { FailureAnnotation } from "../_data/system.schema";

interface FailureLedgerProps {
  failures: FailureAnnotation[];
  onClose: () => void;
}

export default function FailureLedger({ failures, onClose }: FailureLedgerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-40 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-black border-b-2 border-red-500 z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-red-500 font-mono text-2xl font-bold uppercase mb-1">
              Failure Ledger
            </div>
            <div className="text-gray-400 font-mono text-xs uppercase">
              Global Failure Annotations
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white font-mono text-sm uppercase border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* External Review Section */}
        <div className="border-2 border-white p-6 bg-black mb-8">
          <div className="text-white font-mono text-xl font-bold uppercase mb-4">
            EXTERNAL REVIEW
          </div>
          <div className="text-gray-400 font-mono text-xs uppercase mb-4">
            December 14, 2025
          </div>
          
          <div className="text-white font-mono text-sm space-y-4 mb-6">
            <p>
              The Reality Resilience system demonstrates strong architectural coherence and intentional design. 
              The system successfully avoids marketing language and maintains a technical, systems-oriented presentation.
            </p>
            <p>
              Key strengths: Clear hierarchy (dominant pillars), failure propagation visualization, inspection mode 
              for diagnostic depth, and a calm but intimidating presence.
            </p>
            <p>
              Areas addressed: Data integrity (single source of truth for incidents), visual language standardization 
              (Failure node semantics), progressive disclosure (micro-metrics → hover → click), and actionability 
              (deterministic diagnostics, incident management).
            </p>
          </div>

          {/* Resolution Mapping */}
          <div className="border-t border-gray-800 pt-4">
            <div className="text-white font-mono text-sm font-bold uppercase mb-3">
              Resolution Mapping
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="text-gray-400">
                • Data Integrity → <span className="text-white">incidents.selector.ts</span> (single source of truth)
              </div>
              <div className="text-gray-400">
                • Visual Language → <span className="text-white">PillarNode.tsx</span> (Failure node: INCIDENTS + MAX SEVERITY)
              </div>
              <div className="text-gray-400">
                • Progressive Disclosure → <span className="text-white">PillarNode.tsx</span> (micro-metrics, hover subsystems, click evidence)
              </div>
              <div className="text-gray-400">
                • Actionability → <span className="text-white">SubsystemView.tsx</span> (Actions bar), <span className="text-white">IncidentConsole.tsx</span> (Acknowledge, Notes)
              </div>
              <div className="text-gray-400">
                • Integrity Checks → <span className="text-white">DiagnosticStrip.tsx</span> (dev-only violation badge)
              </div>
            </div>
          </div>
        </div>

        {failures.length === 0 ? (
          <div className="text-gray-600 font-mono text-sm italic text-center py-12">
            No failures recorded
          </div>
        ) : (
          <div className="space-y-6">
            {failures.map((failure, index) => (
              <motion.div
                key={failure.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  border-2 p-6 bg-black
                  ${failure.severity === "critical" ? "border-red-500" : ""}
                  ${failure.severity === "moderate" ? "border-yellow-500" : ""}
                  ${failure.severity === "minor" ? "border-gray-500" : ""}
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        text-xs font-mono uppercase px-2 py-1 border
                        ${failure.severity === "critical" ? "border-red-500 text-red-500" : ""}
                        ${failure.severity === "moderate" ? "border-yellow-500 text-yellow-500" : ""}
                        ${failure.severity === "minor" ? "border-gray-500 text-gray-500" : ""}
                      `}
                    >
                      {failure.severity}
                    </div>
                    <div className="text-white font-mono text-sm">
                      {failure.id}
                    </div>
                  </div>
                  {failure.timestamp && (
                    <div className="text-gray-500 font-mono text-xs">
                      {new Date(failure.timestamp).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="text-white font-mono text-sm mb-4">
                  {failure.description}
                </div>

                {failure.affected.length > 0 && (
                  <div className="border-t border-gray-800 pt-4">
                    <div className="text-gray-400 font-mono text-xs uppercase mb-2">
                      Affected Components:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {failure.affected.map((component) => (
                        <span
                          key={component}
                          className="text-white font-mono text-xs border border-gray-700 px-2 py-1"
                        >
                          {component}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

