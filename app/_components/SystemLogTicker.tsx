"use client";

import { useState, useEffect } from "react";

interface LogEntry {
  timestamp: string;
  message: string;
}

const logEntries: LogEntry[] = [
  { timestamp: "14:32:15", message: "Perception: Pattern recognition cycle completed" },
  { timestamp: "14:32:08", message: "Execution: Deployment pipeline validated" },
  { timestamp: "14:31:52", message: "Coordination: Resource allocation optimized" },
  { timestamp: "14:31:38", message: "Representation: Data model sync successful" },
  { timestamp: "14:31:21", message: "System: Health check passed" },
];

export default function SystemLogTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logEntries.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentLog = logEntries[currentIndex];

  return (
    <div className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 z-30">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
          <span className="text-gray-600">[LOG]</span>
          <span className="text-gray-400">{currentLog.timestamp}</span>
          <span className="text-gray-300">{currentLog.message}</span>
        </div>
      </div>
    </div>
  );
}

