import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/content/projects";

interface GraphNode extends Node {
  data: {
    label: string;
    type: "project" | "component" | "technology" | "domain";
    slug?: string;
  };
}

interface GraphEdge extends Edge {
  label?: string;
}

function getNodeColor(type: string): string {
  switch (type) {
    case "project":
      return "rgb(240 236 230)";
    case "component":
      return "rgb(200 200 200)";
    case "technology":
      return "rgb(220 215 208)";
    case "domain":
      return "rgb(231 226 219)";
    default:
      return "rgb(231 226 219)";
  }
}

function getNodeStyle(type: string) {
  const backgroundColor = getNodeColor(type);
  return {
    background: backgroundColor,
    color: type === "project" ? "rgb(28 28 28)" : "rgb(74 74 74)",
    border: `2px solid ${type === "domain" ? "rgb(200 200 200)" : backgroundColor}`,
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "12px",
    fontWeight: type === "project" ? 600 : 500,
    maxWidth: "120px",
    textAlign: "center" as const,
    cursor: type === "project" ? "pointer" : "default",
  };
}

export default function SystemsMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Generate graph data from projects
  useEffect(() => {
    const graphNodes: GraphNode[] = [];
    const graphEdges: GraphEdge[] = [];
    const nodeSet = new Set<string>();

    // Build graph from projects data
    {
      let yOffset = 0;

      // Add project nodes
      projects.forEach((project) => {
        graphNodes.push({
          id: project.slug,
          data: {
            label: project.title,
            type: "project",
            slug: project.slug,
          },
          position: { x: 50, y: yOffset },
          style: getNodeStyle("project"),
        });
        nodeSet.add(project.slug);
        yOffset += 120;

        // Add domain cluster node (if not already added)
        if (!nodeSet.has(project.system)) {
          graphNodes.push({
            id: project.system,
            data: {
              label: project.system,
              type: "domain",
            },
            position: { x: 300, y: yOffset - 60 },
            style: getNodeStyle("domain"),
          });
          nodeSet.add(project.system);
        }

        // Connect project to domain
        graphEdges.push({
          id: `${project.slug}-${project.system}`,
          source: project.slug,
          target: project.system,
          label: "belongs to",
          animated: false,
          markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
          style: { stroke: "rgb(200 200 200)", strokeWidth: 2 },
        });
      });

      // Add component nodes (manually curated)
      const components = [
        { id: "scraping", label: "Scraping Framework", projects: ["public-information-infrastructure"] },
        { id: "change-detection", label: "Change Detection", projects: ["public-information-infrastructure"] },
        { id: "ml-inference", label: "ML Inference", projects: ["omnisign"] },
        { id: "api-layer", label: "REST API", projects: ["public-information-infrastructure"] },
        { id: "federated-learning", label: "Federated Learning", projects: ["omnisign"] },
      ];

      components.forEach((comp, idx) => {
        graphNodes.push({
          id: comp.id,
          data: {
            label: comp.label,
            type: "component",
          },
          position: { x: 550, y: idx * 110 },
          style: getNodeStyle("component"),
        });
        nodeSet.add(comp.id);

        // Connect projects to components
        comp.projects.forEach((projectSlug) => {
          graphEdges.push({
            id: `${projectSlug}-${comp.id}`,
            source: projectSlug,
            target: comp.id,
            label: "uses",
            animated: false,
            markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
            style: { stroke: "rgb(200 200 200)", strokeWidth: 1.5 },
          });
        });
      });

      // Add technology nodes (from stack data)
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
        graphNodes.push({
          id: tech.toLowerCase().replace(/\s+/g, "-"),
          data: {
            label: tech,
            type: "technology",
          },
          position: { x: 800, y: techIdx * 70 },
          style: getNodeStyle("technology"),
        });

        // Connect projects to technologies
        techProjects[tech]?.forEach((projectSlug) => {
          graphEdges.push({
            id: `${projectSlug}-${tech.toLowerCase().replace(/\s+/g, "-")}`,
            source: projectSlug,
            target: tech.toLowerCase().replace(/\s+/g, "-"),
            animated: false,
            markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
            style: { stroke: "rgb(200 200 200)", strokeWidth: 1 },
          });
        });

        techIdx++;
      });

      setNodes(graphNodes);
      setEdges(graphEdges);
    }
  }, [setNodes, setEdges]);

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: GraphNode) => {
      if (node.data.type === "project" && node.data.slug) {
        setSelectedProject(node.data.slug);
      }
    },
    []
  );

  return (
    <div className="flex h-[600px] w-full gap-4 rounded border border-border bg-surface-raised">
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={(event, node) => handleNodeClick(event, node as GraphNode)}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Side panel for selected project */}
      {selectedProject && (
        <div className="w-80 border-l border-border p-4 overflow-y-auto bg-surface-raised">
          <button
            onClick={() => setSelectedProject(null)}
            className="mb-4 text-sm text-text-muted hover:text-text-secondary"
          >
            ✕ Close
          </button>

          {/* This will be populated with project info */}
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">
              Project: <strong>{selectedProject}</strong>
            </p>
            <Link
              to={`/projects/${selectedProject}`}
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-text-primary hover:text-text-secondary transition-colors"
            >
              View case study →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
