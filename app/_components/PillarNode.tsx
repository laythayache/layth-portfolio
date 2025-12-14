"use client";

import { SystemPillar, PillarType } from "../_data/system.schema";

interface PillarNodeProps {
  pillar: SystemPillar;
  isActive: boolean;
  isHovered: boolean;
  isInspectionMode: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: PillarType) => void;
}

export default function PillarNode({
  pillar,
  isActive,
  isHovered,
  isInspectionMode,
  onHover,
  onClick,
}: PillarNodeProps) {
  const isDominant = pillar.id === "perception" || pillar.id === "execution";
  const isSecondary = pillar.id === "representation" || pillar.id === "coordination";
  const isFailure = pillar.id === "failure";

  const statusColors = {
    operational: "border-green-500 bg-green-500/10 text-green-500",
    degraded: "border-yellow-500 bg-yellow-500/10 text-yellow-500",
    failed: "border-red-500 bg-red-500/10 text-red-500",
    maintenance: "border-blue-500 bg-blue-500/10 text-blue-500",
  };

  const statusColor = statusColors[pillar.status];
  const statusTone = pillar.status === "operational" ? "text-green-500" : 
                     pillar.status === "degraded" ? "text-yellow-500" :
                     pillar.status === "failed" ? "text-red-500" : "text-blue-500";
  
  // Failure node has special styling - cross-cutting rupture feel
  const failureColor = isFailure ? "border-red-500 bg-red-500/20 text-red-500" : statusColor;
  
  // Hierarchy: Dominant (1.7x), Secondary (smaller), Failure (special)
  const borderWidth = isDominant ? "border-[6px]" : isFailure ? "border-2 border-dashed" : "border-2";
  const nodeSize = isDominant ? "min-w-[340px] min-h-[180px]" : isSecondary ? "min-w-[160px]" : isFailure ? "min-w-[200px]" : "min-w-[200px]";
  const textSize = isDominant ? "text-base" : isSecondary ? "text-xs" : "text-sm";
  const padding = isDominant ? "p-8" : isSecondary ? "p-4" : "p-6";

  return (
    <div
      className="absolute cursor-pointer select-none transition-all duration-200"
      style={{
        left: `${pillar.position.x}%`,
        top: `${pillar.position.y}%`,
        transform: `translate(-50%, -50%) scale(${isHovered ? (isDominant ? 1.1 : 1.08) : isActive ? (isDominant ? 1.08 : 1.05) : (isDominant ? 1.0 : 0.95)})`,
        opacity: 1,
      }}
      onMouseEnter={() => onHover(pillar.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(pillar.id)}
    >
      {/* Main node container */}
      <div
        className={`
          relative
          ${failureColor}
          ${borderWidth}
          ${isHovered ? "border-opacity-100" : "border-opacity-60"}
          ${isActive ? "border-opacity-100" : ""}
          ${isHovered ? `${statusTone} shadow-[0_0_30px_currentColor]` : ""}
          ${isDominant && isHovered ? `shadow-[0_0_60px_currentColor]` : ""}
          ${isSecondary ? "opacity-70" : ""}
          transition-all duration-200
        `}
      >
        {/* Brutalist frame */}
        <div className={`bg-black ${padding} ${nodeSize}`}>
          {/* Label */}
          <div className={`text-white font-mono ${textSize} font-bold uppercase tracking-wider mb-2`}>
            {pillar.label}
          </div>

          {/* Status indicator - special handling for Failure node */}
          {!isFailure ? (
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`
                  w-2 h-2 rounded-full
                  ${pillar.status === "operational" ? "bg-green-500" : ""}
                  ${pillar.status === "degraded" ? "bg-yellow-500" : ""}
                  ${pillar.status === "failed" ? "bg-red-500" : ""}
                  ${pillar.status === "maintenance" ? "bg-blue-500" : ""}
                `}
              />
              <span className="text-xs text-gray-400 font-mono uppercase">
                {pillar.status}
              </span>
            </div>
          ) : (
            <div className="mb-4 space-y-2">
              <div className="text-xs text-red-500 font-mono uppercase">
                INCIDENTS: {pillar.failures?.length || 0}
              </div>
              {pillar.failures && pillar.failures.length > 0 && (
                <div className="text-xs text-red-500 font-mono uppercase">
                  MAX SEVERITY: {pillar.failures.some(f => f.severity === "critical") ? "CRITICAL" :
                            pillar.failures.some(f => f.severity === "moderate") ? "MODERATE" : "MINOR"}
                </div>
              )}
            </div>
          )}

          {/* Micro-metrics at rest (always visible) */}
          <div className="text-xs text-gray-500 font-mono border-t border-gray-800 pt-2 mt-2 space-y-1">
            <div>Subsystems: {pillar.substructure.length}</div>
            <div>
              {pillar.id === "perception" && `Evidence: ${pillar.substructure.reduce((acc, s) => acc + s.evidence.length, 0)}`}
              {pillar.id === "execution" && `Evidence: ${pillar.substructure.reduce((acc, s) => acc + s.evidence.length, 0)}`}
              {pillar.id === "representation" && `Models: ${pillar.substructure.length}`}
              {pillar.id === "coordination" && `Channels: ${pillar.substructure.length}`}
              {pillar.id === "failure" && `Active: ${pillar.failures?.length || 0}`}
            </div>
          </div>

          {/* Top 3 subsystems on hover */}
          {isHovered && !isInspectionMode && (
            <div className="text-xs text-gray-400 font-mono border-t border-gray-800 pt-2 mt-2 space-y-1">
              <div className="text-gray-500 uppercase mb-1">Subsystems:</div>
              {pillar.substructure.slice(0, 3).map((sub) => (
                <div key={sub.id} className="truncate">• {sub.label}</div>
              ))}
              {pillar.substructure.length > 3 && (
                <div className="text-gray-600">+{pillar.substructure.length - 3} more</div>
              )}
            </div>
          )}

          {/* Node ID (inspection mode only) */}
          {isInspectionMode && (
            <div className="text-xs text-gray-600 font-mono mt-2">
              ID: {pillar.id}
            </div>
          )}

          {/* Failure indicator */}
          {pillar.failures && pillar.failures.length > 0 && !isFailure && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-black" />
          )}
        </div>

        {/* Connection points (orthogonal lines) */}
        {isHovered && !isFailure && (
          <>
            <div className="absolute top-1/2 -left-20 w-20 h-0.5 bg-current origin-right opacity-60" />
            <div className="absolute top-1/2 -right-20 w-20 h-0.5 bg-current origin-left opacity-60" />
            <div className="absolute -top-20 left-1/2 w-0.5 h-20 bg-current origin-bottom opacity-60" />
            <div className="absolute -bottom-20 left-1/2 w-0.5 h-20 bg-current origin-top opacity-60" />
          </>
        )}
      </div>
    </div>
  );
}

