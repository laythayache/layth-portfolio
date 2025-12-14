import { SystemPillar, FailureAnnotation } from "./system.schema";

/**
 * Single source of truth for active incidents across the system.
 * All UI components must derive their incident data from this selector.
 */
export function getActiveIncidents(pillars: SystemPillar[]): FailureAnnotation[] {
  const incidents: FailureAnnotation[] = [];
  
  pillars.forEach((pillar) => {
    if (pillar.failures && pillar.failures.length > 0) {
      incidents.push(...pillar.failures);
    }
  });

  // Deduplicate by ID (in case same failure appears in multiple pillars)
  const uniqueIncidents = new Map<string, FailureAnnotation>();
  incidents.forEach((incident) => {
    if (!uniqueIncidents.has(incident.id)) {
      uniqueIncidents.set(incident.id, incident);
    }
  });

  return Array.from(uniqueIncidents.values());
}

/**
 * Get maximum severity from active incidents
 */
export function getMaxSeverity(incidents: FailureAnnotation[]): "critical" | "moderate" | "minor" | null {
  if (incidents.length === 0) return null;
  
  if (incidents.some((i) => i.severity === "critical")) return "critical";
  if (incidents.some((i) => i.severity === "moderate")) return "moderate";
  return "minor";
}

