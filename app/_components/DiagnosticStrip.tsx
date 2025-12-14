"use client";

import { BuildDiagnostics } from "../_data/system.diagnostics";
import { FailureAnnotation } from "../_data/system.schema";

interface DiagnosticStripProps {
  diagnostics: BuildDiagnostics;
  activeIncidents: FailureAnnotation[];
}

export default function DiagnosticStrip({ diagnostics, activeIncidents }: DiagnosticStripProps) {
  const incidentCount = activeIncidents.length;
  const displayedCount = diagnostics.incidentCount;
  const integrityViolation = process.env.NODE_ENV === "development" && incidentCount !== displayedCount;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t-2 border-gray-800 z-20">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between text-xs font-mono text-gray-400">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-gray-500">UPTIME:</span>{" "}
              <span className="text-white">{diagnostics.uptime}</span>
            </div>
            <div>
              <span className="text-gray-500">BUILD:</span>{" "}
              <span className="text-white">{diagnostics.buildId}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">INCIDENTS (ACTIVE):</span>{" "}
              <span className={incidentCount > 0 ? "text-red-500" : "text-white"}>
                {incidentCount}
              </span>
              {integrityViolation && (
                <span className="text-red-500 border border-red-500 px-2 py-0.5">
                  INTEGRITY VIOLATION
                </span>
              )}
            </div>
            {diagnostics.lastAnomalyTime && (
              <div>
                <span className="text-gray-500">LAST ANOMALY:</span>{" "}
                <span className="text-gray-400">
                  {new Date(diagnostics.lastAnomalyTime).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

