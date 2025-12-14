"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SystemMap from "../_components/SystemMap";
import SubsystemView from "../_components/SubsystemView";
import FailureLedger from "../_components/FailureLedger";
import DiagnosticStrip from "../_components/DiagnosticStrip";
import SystemLogTicker from "../_components/SystemLogTicker";
import IncidentConsole from "../_components/IncidentConsole";
import { initializeSystem } from "../_data/system.init";
import { getBuildDiagnostics } from "../_data/system.diagnostics";
import { getActiveIncidents } from "../_data/incidents.selector";
import { PillarType, SystemPillar, FailureAnnotation } from "../_data/system.schema";

export default function LandingEntry() {
  const systemState = useMemo(() => initializeSystem(), []);
  const diagnostics = useMemo(() => getBuildDiagnostics(), []);
  const [activePillar, setActivePillar] = useState<PillarType | null>(null);
  const [isInspectionMode, setIsInspectionMode] = useState(false);
  const [showFailureLedger, setShowFailureLedger] = useState(false);
  const [showIncidents, setShowIncidents] = useState(true);

  // Keyboard handler for Inspection Mode
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "i" || e.key === "I") {
        setIsInspectionMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const activePillarData = useMemo(() => {
    if (!activePillar) return null;
    return systemState.pillars.find((p) => p.id === activePillar) || null;
  }, [activePillar, systemState.pillars]);

  // Single source of truth for active incidents
  const activeIncidents = useMemo(() => getActiveIncidents(systemState.pillars), [systemState.pillars]);

  const handlePillarClick = (id: PillarType) => {
    if (id === "failure") {
      setShowFailureLedger(true);
    } else {
      setActivePillar(id);
    }
  };

  const handleCloseSubsystem = () => {
    setActivePillar(null);
  };

  const handleCloseFailureLedger = () => {
    setShowFailureLedger(false);
  };

  return (
    <div className="relative">
      {/* System Log Ticker */}
      <SystemLogTicker />

      {/* System Map (always visible, dimmed when subsystem is open) */}
      <div className={activePillar || showFailureLedger ? "opacity-30 pointer-events-none" : ""}>
        <SystemMap
          pillars={systemState.pillars}
          activePillar={activePillar}
          isInspectionMode={isInspectionMode}
          onPillarClick={handlePillarClick}
        />
      </div>

      {/* Diagnostic Strip */}
      <DiagnosticStrip diagnostics={diagnostics} activeIncidents={activeIncidents} />

      {/* Subsystem View (overlay when pillar is clicked) */}
      <AnimatePresence>
        {activePillarData && (
          <SubsystemView
            pillar={activePillarData}
            onClose={handleCloseSubsystem}
          />
        )}
      </AnimatePresence>

      {/* Failure Ledger (overlay when Failure is clicked) */}
      <AnimatePresence>
        {showFailureLedger && (
          <FailureLedger
            failures={activeIncidents}
            onClose={handleCloseFailureLedger}
          />
        )}
      </AnimatePresence>

      {/* Incident Console */}
      <IncidentConsole failures={activeIncidents} isVisible={showIncidents} />

      {/* Control buttons */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-2">
        <button
          onClick={() => setShowIncidents(!showIncidents)}
          className="text-white font-mono text-xs uppercase border-2 border-white px-4 py-2 bg-black hover:bg-white hover:text-black transition-colors"
        >
          {showIncidents ? "Hide" : "Show"} Incidents
        </button>
        <button
          onClick={() => setIsInspectionMode(!isInspectionMode)}
          className={`font-mono text-xs uppercase border-2 px-4 py-2 transition-colors ${
            isInspectionMode
              ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"
              : "border-white text-white bg-black hover:bg-white hover:text-black"
          }`}
        >
          Inspection Mode {isInspectionMode ? "[ON]" : "[OFF]"}
        </button>
      </div>
    </div>
  );
}
