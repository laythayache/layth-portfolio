export interface BuildDiagnostics {
  uptime: string;
  buildId: string;
  incidentCount: number;
  lastAnomalyTime: string | null;
}

export function getBuildDiagnostics(): BuildDiagnostics {
  const now = new Date();
  const buildDate = new Date(2024, 11, 14); // December 14, 2024
  const daysSinceBuild = Math.floor((now.getTime() - buildDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    uptime: `${daysSinceBuild}d ${Math.floor((now.getTime() - buildDate.getTime()) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))}h`,
    buildId: `RR-${buildDate.getFullYear()}.${String(buildDate.getMonth() + 1).padStart(2, '0')}.${String(buildDate.getDate()).padStart(2, '0')}`,
    incidentCount: 1,
    lastAnomalyTime: "2024-12-14T00:00:00Z",
  };
}

