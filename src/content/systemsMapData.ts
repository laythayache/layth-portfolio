import { projects } from "./projects";
import { Node, Edge, MarkerType } from "@xyflow/react";

export interface GraphNode extends Node {
  data: {
    label: string;
    type: "project" | "component" | "technology" | "domain";
    slug?: string;
  };
}

export interface GraphEdge extends Edge {
  label?: string;
}

/**
 * Generates systems architecture graph from projects data.
 * Returns nodes and edges for visualization with xyflow.
 *
 * Node types:
 * - project: Top-level projects/systems
 * - component: Architectural components (scraping, ml-inference, etc)
 * - technology: Tech stack items (TypeScript, PostgreSQL, TensorFlow, etc)
 * - domain: Categorical domains (public data, accessibility, etc)
 *
 * Relationships:
 * - project → domain: "belongs to"
 * - project → component: "uses"
 * - project → technology: "built with"
 */

export function generateSystemsGraph(): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const nodeSet = new Set<string>();

  let yOffset = 0;

  // 1. Add project nodes (left column)
  projects.forEach((project) => {
    nodes.push({
      id: project.slug,
      data: {
        label: project.title,
        type: "project",
        slug: project.slug,
      },
      position: { x: 50, y: yOffset },
      style: {
        background: "#1A1A1A",
        color: "#F2EDE8",
        border: "2px solid #1A1A1A",
        borderRadius: "6px",
        padding: "8px 12px",
        fontSize: "12px",
        fontWeight: 600,
        maxWidth: "120px",
        textAlign: "center",
        cursor: "pointer",
      },
    });
    nodeSet.add(project.slug);
    yOffset += 120;
  });

  // 2. Add domain cluster nodes (middle column)
  const domainSet = new Set<string>();
  projects.forEach((project, idx) => {
    if (!domainSet.has(project.system)) {
      nodes.push({
        id: project.system,
        data: {
          label: project.system,
          type: "domain",
        },
        position: { x: 300, y: idx * 120 },
        style: {
          background: "#cbd5e1",
          color: "#1A1A1A",
          border: "2px solid #cbd5e1",
          borderRadius: "6px",
          padding: "8px 12px",
          fontSize: "12px",
          fontWeight: 500,
          maxWidth: "120px",
          textAlign: "center",
        },
      });
      domainSet.add(project.system);
      nodeSet.add(project.system);
    }

    // Connect project to domain
    edges.push({
      id: `${project.slug}-${project.system}`,
      source: project.slug,
      target: project.system,
      label: "belongs to",
      animated: false,
      markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
      style: { stroke: "#cbd5e1", strokeWidth: 2 },
    });
  });

  // 3. Add component nodes (manually curated - adjust based on actual projects)
  const components = [
    {
      id: "scraping",
      label: "Scraping",
      projects: ["public-information-infrastructure"],
    },
    {
      id: "change-detection",
      label: "Change Detection",
      projects: ["public-information-infrastructure"],
    },
    {
      id: "normalization",
      label: "Normalization",
      projects: ["public-information-infrastructure"],
    },
    {
      id: "api-layer",
      label: "REST API",
      projects: ["public-information-infrastructure"],
    },
    {
      id: "ml-inference",
      label: "ML Inference",
      projects: ["omnisign"],
    },
    {
      id: "federated-learning",
      label: "Federated Learning",
      projects: ["omnisign"],
    },
  ];

  components.forEach((comp, idx) => {
    nodes.push({
      id: comp.id,
      data: {
        label: comp.label,
        type: "component",
      },
      position: { x: 550, y: idx * 100 },
      style: {
        background: "#64748b",
        color: "#F2EDE8",
        border: "2px solid #64748b",
        borderRadius: "6px",
        padding: "8px 12px",
        fontSize: "12px",
        fontWeight: 500,
        maxWidth: "120px",
        textAlign: "center",
      },
    });
    nodeSet.add(comp.id);

    // Connect projects to components
    comp.projects.forEach((projectSlug) => {
      edges.push({
        id: `${projectSlug}-${comp.id}`,
        source: projectSlug,
        target: comp.id,
        label: "uses",
        animated: false,
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
        style: { stroke: "#94a3b8", strokeWidth: 1.5 },
      });
    });
  });

  // 4. Add technology nodes (auto-generated from stack)
  const techSet = new Set<string>();
  const techProjects: { [key: string]: string[] } = {};

  projects.forEach((project) => {
    if (project.stack) {
      project.stack.split(",").forEach((tech) => {
        const cleanTech = tech.trim();
        techSet.add(cleanTech);
        if (!techProjects[cleanTech]) {
          techProjects[cleanTech] = [];
        }
        techProjects[cleanTech].push(project.slug);
      });
    }
  });

  let techIdx = 0;
  Array.from(techSet).forEach((tech) => {
    const techId = tech.toLowerCase().replace(/\s+/g, "-");
    nodes.push({
      id: techId,
      data: {
        label: tech,
        type: "technology",
      },
      position: { x: 800, y: techIdx * 70 },
      style: {
        background: "#94a3b8",
        color: "#F2EDE8",
        border: "2px solid #94a3b8",
        borderRadius: "6px",
        padding: "8px 12px",
        fontSize: "11px",
        fontWeight: 500,
        maxWidth: "100px",
        textAlign: "center",
      },
    });
    nodeSet.add(techId);

    // Connect projects to technologies
    techProjects[tech]?.forEach((projectSlug) => {
      edges.push({
        id: `${projectSlug}-${techId}`,
        source: projectSlug,
        target: techId,
        animated: false,
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
        style: { stroke: "#cbd5e1", strokeWidth: 1 },
      });
    });

    techIdx++;
  });

  return { nodes, edges };
}

/**
 * Compact version for homepage or smaller displays
 * Only shows projects and domains
 */
export function generateSystemsGraphCompact(): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  let yOffset = 0;

  // Add project nodes
  projects.forEach((project) => {
    nodes.push({
      id: project.slug,
      data: {
        label: project.title,
        type: "project",
        slug: project.slug,
      },
      position: { x: 0, y: yOffset },
      style: {
        background: "#1A1A1A",
        color: "#F2EDE8",
        border: "2px solid #1A1A1A",
        borderRadius: "6px",
        padding: "8px 12px",
        fontSize: "12px",
        fontWeight: 600,
        maxWidth: "140px",
      },
    });
    yOffset += 100;
  });

  // Add domain nodes
  const domainSet = new Set<string>();
  projects.forEach((project, idx) => {
    if (!domainSet.has(project.system)) {
      nodes.push({
        id: project.system,
        data: {
          label: project.system,
          type: "domain",
        },
        position: { x: 200, y: idx * 100 },
        style: {
          background: "#cbd5e1",
          color: "#1A1A1A",
          border: "2px solid #cbd5e1",
          borderRadius: "6px",
          padding: "8px 12px",
          fontSize: "12px",
          maxWidth: "120px",
        },
      });
      domainSet.add(project.system);

      edges.push({
        id: `${project.slug}-${project.system}`,
        source: project.slug,
        target: project.system,
        animated: false,
        markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
        style: { stroke: "#cbd5e1", strokeWidth: 2 },
      });
    }
  });

  return { nodes, edges };
}
