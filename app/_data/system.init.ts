import { SystemPillar, SystemState, FailureAnnotation } from "./system.schema";

// Import JSON data - using dynamic imports for better compatibility
import perceptionDataRaw from "./perception.json";
import executionDataRaw from "./execution.json";
import representationDataRaw from "./representation.json";
import coordinationDataRaw from "./coordination.json";
import failureDataRaw from "./failure.json";
import failuresDataRaw from "./failures.json";

// Type assertions for JSON imports (position is added later)
// Cast through unknown to handle JSON type differences (null vs undefined, etc.)
const perceptionData = perceptionDataRaw as unknown as Omit<SystemPillar, 'position'>;
const executionData = executionDataRaw as unknown as Omit<SystemPillar, 'position'>;
const representationData = representationDataRaw as unknown as Omit<SystemPillar, 'position'>;
const coordinationData = coordinationDataRaw as unknown as Omit<SystemPillar, 'position'>;
const failureData = failureDataRaw as unknown as Omit<SystemPillar, 'position'>;
const failuresData = failuresDataRaw as { global: FailureAnnotation[] };

// Initialize pillar positions (orthogonal layout)
const pillarPositions = {
  perception: { x: 50, y: 25 }, // Top center (dominant)
  representation: { x: 25, y: 50 }, // Left center
  coordination: { x: 75, y: 50 }, // Right center
  execution: { x: 50, y: 75 }, // Bottom center (dominant)
  failure: { x: 50, y: 50 }, // Center (special node)
};

export function initializeSystem(): SystemState {
  const pillars: SystemPillar[] = [
    {
      ...perceptionData,
      position: pillarPositions.perception,
      failures: [],
    },
    {
      ...executionData,
      position: pillarPositions.execution,
      failures: [],
    },
    {
      ...representationData,
      position: pillarPositions.representation,
      failures: [],
    },
    {
      ...coordinationData,
      position: pillarPositions.coordination,
      failures: [],
    },
    {
      ...failureData,
      position: pillarPositions.failure,
      failures: failuresData.global, // Failure node contains all global failures
    },
  ];

  // Assign global failures to Failure node
  const failurePillar = pillars.find((p) => p.id === "failure");
  if (failurePillar) {
    failurePillar.failures = failuresData.global;
  }

  // Inject global failures into affected pillars
  failuresData.global.forEach((failure) => {
    failure.affected.forEach((pillarId) => {
      const pillar = pillars.find((p) => p.id === pillarId);
      if (pillar && pillar.id !== "failure") {
        if (!pillar.failures) {
          pillar.failures = [];
        }
        pillar.failures.push(failure);
      }
    });
  });

  return {
    name: "Reality Resilience",
    status: "operational",
    activePillar: null,
    pillars,
  };
}

