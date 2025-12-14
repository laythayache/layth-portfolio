"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FailureAnnotation } from "../_data/system.schema";

interface IncidentConsoleProps {
  failures: FailureAnnotation[];
  isVisible: boolean;
}

export default function IncidentConsole({ failures, isVisible }: IncidentConsoleProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Load notes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('incident-notes');
    if (stored) {
      try {
        setNotes(JSON.parse(stored));
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  const handleAcknowledge = (id: string) => {
    setAcknowledged(prev => new Set([...prev, id]));
  };

  const handleAddNote = (id: string, note: string) => {
    const updated = { ...notes, [id]: note };
    setNotes(updated);
    localStorage.setItem('incident-notes', JSON.stringify(updated));
  };

  if (failures.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 right-8 z-50"
        >
          {isCollapsed ? (
            <button
              onClick={() => setIsCollapsed(false)}
              className="bg-black border-2 border-red-500 px-4 py-2 hover:border-red-400 transition-colors"
            >
              <div className="text-red-500 font-mono text-xs uppercase">
                INCIDENTS: {failures.length}
              </div>
            </button>
          ) : (
            <div className="bg-black border-2 border-red-500 max-w-md">
              {/* Header */}
              <div className="border-b border-red-500/50 p-3 flex items-center justify-between">
                <div className="text-red-500 font-mono text-sm font-bold uppercase">
                  Incident Console
                </div>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="text-gray-500 font-mono text-xs hover:text-white transition-colors"
                >
                  [−]
                </button>
              </div>

              {/* Incidents */}
              <div className="max-h-96 overflow-y-auto">
                {failures.map((failure, index) => (
                  <div
                    key={failure.id}
                    className={`
                      border-b border-gray-800 p-4
                      ${index === failures.length - 1 ? "border-b-0" : ""}
                    `}
                  >
                    {/* Severity badge and timestamp */}
                    <div className="flex items-center justify-between mb-2">
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
                      {failure.timestamp && (
                        <div className="text-gray-500 font-mono text-xs">
                          {new Date(failure.timestamp).toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="text-white font-mono text-xs mb-3">
                      {failure.description}
                    </div>

                    {/* Affected modules */}
                    {failure.affected.length > 0 && (
                      <div className="mb-2">
                        <div className="text-gray-500 font-mono text-xs uppercase mb-1">
                          Affected:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {failure.affected.map((component) => (
                            <span
                              key={component}
                              className="text-white font-mono text-xs border border-gray-700 px-2 py-0.5"
                            >
                              {component}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trace line */}
                    <div className="border-t border-gray-800 pt-2 mt-2">
                      <div className="text-gray-600 font-mono text-xs mb-2">
                        ID: {failure.id}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3">
                        {!acknowledged.has(failure.id) && (
                          <button
                            onClick={() => handleAcknowledge(failure.id)}
                            className="text-white font-mono text-xs uppercase border border-gray-700 px-2 py-1 hover:border-white transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                        {acknowledged.has(failure.id) && (
                          <span className="text-gray-500 font-mono text-xs">Acknowledged</span>
                        )}
                        <input
                          type="text"
                          placeholder="Add note..."
                          value={notes[failure.id] || ""}
                          onChange={(e) => handleAddNote(failure.id, e.target.value)}
                          className="bg-black border border-gray-700 text-white font-mono text-xs px-2 py-1 flex-1"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.currentTarget.blur();
                            }
                          }}
                        />
                      </div>
                      {notes[failure.id] && (
                        <div className="text-gray-500 font-mono text-xs mt-2 italic">
                          Note: {notes[failure.id]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

