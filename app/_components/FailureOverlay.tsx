"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FailureAnnotation } from "../_data/system.schema";

interface FailureOverlayProps {
  failures: FailureAnnotation[];
  isVisible: boolean;
}

export default function FailureOverlay({ failures, isVisible }: FailureOverlayProps) {
  if (failures.length === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 z-50 max-w-md"
        >
          <div className="bg-black border-2 border-red-500 p-4">
            <div className="text-red-500 font-mono text-xs uppercase tracking-wider mb-3">
              Failure Annotations
            </div>
            <div className="space-y-3">
              {failures.map((failure) => (
                <div
                  key={failure.id}
                  className={`
                    border-l-2 pl-3
                    ${failure.severity === "critical" ? "border-red-500" : ""}
                    ${failure.severity === "moderate" ? "border-yellow-500" : ""}
                    ${failure.severity === "minor" ? "border-gray-500" : ""}
                  `}
                >
                  <div className="text-white text-xs font-mono mb-1">
                    [{failure.severity.toUpperCase()}] {failure.description}
                  </div>
                  {failure.affected.length > 0 && (
                    <div className="text-gray-500 text-xs font-mono">
                      Affected: {failure.affected.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

