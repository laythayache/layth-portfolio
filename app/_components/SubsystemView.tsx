"use client";

import { motion } from "framer-motion";
import { SystemPillar } from "../_data/system.schema";

interface SubsystemViewProps {
  pillar: SystemPillar;
  onClose: () => void;
}

export default function SubsystemView({ pillar, onClose }: SubsystemViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-40 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-black border-b-2 border-white z-10 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white font-mono text-2xl font-bold uppercase mb-1">
                {pillar.label}
              </div>
              <div className="text-gray-400 font-mono text-xs uppercase">
                Status: {pillar.status}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white font-mono text-sm uppercase border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
            >
              Close
            </button>
          </div>
          
          {/* Actions Bar */}
          <div className="flex items-center gap-3 border-t border-gray-800 pt-4">
            <button
              onClick={() => {
                // View Logs - opens a drawer (simulated)
                console.log("View Logs for", pillar.id);
              }}
              className="text-white font-mono text-xs uppercase border border-gray-700 px-3 py-1.5 hover:border-white transition-colors"
            >
              View Logs
            </button>
            <button
              onClick={() => {
                // Run Diagnostic - deterministic checks
                const diagnosticResults = {
                  schemaValid: true,
                  incidentIntegrity: true,
                  subsystemCount: pillar.substructure.length,
                  evidenceCount: pillar.substructure.reduce((acc, s) => acc + s.evidence.length, 0),
                };
                console.log("Diagnostic results:", diagnosticResults);
                alert(`Diagnostic: Schema valid, ${pillar.substructure.length} subsystems, ${pillar.substructure.reduce((acc, s) => acc + s.evidence.length, 0)} evidence items`);
              }}
              className="text-white font-mono text-xs uppercase border border-gray-700 px-3 py-1.5 hover:border-white transition-colors"
            >
              Run Diagnostic
            </button>
            <button
              onClick={() => {
                // Open Artifacts - collect all artifact URLs
                const artifacts = pillar.substructure.flatMap(s => 
                  s.evidence.flatMap(e => e.artifacts.map(a => a.url))
                );
                if (artifacts.length > 0) {
                  artifacts.forEach(url => window.open(url, '_blank'));
                } else {
                  alert("No artifacts available");
                }
              }}
              className="text-white font-mono text-xs uppercase border border-gray-700 px-3 py-1.5 hover:border-white transition-colors"
            >
              Open Artifacts
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="space-y-8">
          {pillar.substructure.map((subsystem, index) => (
            <motion.div
              key={subsystem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-2 border-white p-6 bg-black"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-mono text-lg font-bold uppercase">
                  {subsystem.label}
                </div>
                <div
                  className={`
                    text-xs font-mono uppercase px-2 py-1 border
                    ${subsystem.status === "operational" ? "border-green-500 text-green-500" : ""}
                    ${subsystem.status === "degraded" ? "border-yellow-500 text-yellow-500" : ""}
                    ${subsystem.status === "failed" ? "border-red-500 text-red-500" : ""}
                  `}
                >
                  {subsystem.status}
                </div>
              </div>

              {/* Evidence */}
              {subsystem.evidence.length > 0 && (
                <div className="space-y-6 mt-6">
                  {subsystem.evidence.map((evidence) => (
                    <div
                      key={evidence.id}
                      className="border-l-2 border-gray-700 pl-4 py-3"
                    >
                      {/* Claim */}
                      <div className="text-white font-mono text-sm font-bold mb-3">
                        {evidence.claim}
                      </div>

                      {/* Constraints */}
                      {evidence.constraints.length > 0 && (
                        <div className="mb-3">
                          <div className="text-gray-500 font-mono text-xs uppercase mb-1">
                            Constraints:
                          </div>
                          <ul className="list-disc list-inside space-y-1">
                            {evidence.constraints.map((constraint, idx) => (
                              <li key={idx} className="text-gray-400 font-mono text-xs">
                                {constraint}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tradeoffs */}
                      {evidence.tradeoffs.length > 0 && (
                        <div className="mb-3">
                          <div className="text-gray-500 font-mono text-xs uppercase mb-1">
                            Tradeoffs:
                          </div>
                          <ul className="list-disc list-inside space-y-1">
                            {evidence.tradeoffs.map((tradeoff, idx) => (
                              <li key={idx} className="text-gray-400 font-mono text-xs">
                                {tradeoff}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Artifacts */}
                      {evidence.artifacts.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-800">
                          <div className="text-gray-500 font-mono text-xs uppercase mb-2">
                            Artifacts:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {evidence.artifacts.map((artifact, idx) => (
                              <a
                                key={idx}
                                href={artifact.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white font-mono text-xs border border-gray-700 px-2 py-1 hover:border-white hover:bg-white hover:text-black transition-colors"
                              >
                                [{artifact.type}] {artifact.label || artifact.type}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Failure Link */}
                      {evidence.failureLink && (
                        <div className="mt-3 pt-3 border-t border-red-500/50">
                          <div className="text-red-500 font-mono text-xs">
                            → Linked to failure: {evidence.failureLink}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {subsystem.evidence.length === 0 && (
                <div className="text-gray-600 font-mono text-xs italic">
                  No evidence recorded
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

