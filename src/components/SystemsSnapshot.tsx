/**
 * Visual snapshot of systems architecture
 * Shows key components and their relationships without full interactivity
 */

export default function SystemsSnapshot() {
  return (
    <svg
      viewBox="0 0 800 300"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          {`
            .box { fill: #f2ede8; stroke: #1a1a1a; stroke-width: 1.5; }
            .box-accent { fill: none; stroke: #1a1a1a; stroke-width: 1; }
            .label-primary { font-family: sans-serif; font-size: 12px; font-weight: 600; fill: #1a1a1a; }
            .label-secondary { font-family: monospace; font-size: 9px; fill: #1a1a1a; opacity: 0.6; }
            .arrow { stroke: #1a1a1a; stroke-width: 1.2; fill: none; opacity: 0.4; }
            .dot { fill: #1a1a1a; opacity: 0.3; }
          `}
        </style>
        <marker
          id="arrowSmall"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="2.5"
          orient="auto"
        >
          <polygon points="0 0, 8 2.5, 0 5" fill="#1a1a1a" opacity="0.4" />
        </marker>
      </defs>

      {/* Background grid (subtle) */}
      <g opacity="0.02">
        {[0, 40, 80, 120, 160, 200, 240, 280].map((x) => (
          <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="300" stroke="#1a1a1a" />
        ))}
        {[0, 75, 150, 225, 300].map((y) => (
          <line key={`h-${y}`} x1="0" y1={y} x2="800" y2={y} stroke="#1a1a1a" />
        ))}
      </g>

      {/* Left Column: Data Collection */}
      <g>
        <text x="20" y="25" className="label-secondary">
          Collection
        </text>

        {/* Media sources */}
        <rect x="10" y="40" width="80" height="50" rx="3" className="box" />
        <text x="50" y="60" textAnchor="middle" className="label-primary">
          Media
        </text>
        <text x="50" y="75" textAnchor="middle" className="label-secondary">
          Sources
        </text>

        {/* Scraper */}
        <rect x="10" y="110" width="80" height="50" rx="3" className="box" />
        <text x="50" y="130" textAnchor="middle" className="label-primary">
          Scraper
        </text>
        <text x="50" y="145" textAnchor="middle" className="label-secondary">
          Distributed
        </text>

        {/* Arrow down */}
        <path className="arrow" d="M 50 90 L 50 110" markerEnd="url(#arrowSmall)" />
        <path className="arrow" d="M 50 160 L 50 180" markerEnd="url(#arrowSmall)" />
      </g>

      {/* Center Column: Processing */}
      <g>
        <text x="180" y="25" className="label-secondary">
          Processing
        </text>

        {/* Normalization */}
        <rect x="140" y="40" width="80" height="50" rx="3" className="box" />
        <text x="180" y="58" textAnchor="middle" className="label-primary">
          Normalize
        </text>
        <text x="180" y="73" textAnchor="middle" className="label-secondary">
          Schema
        </text>

        {/* Storage */}
        <rect x="140" y="110" width="80" height="50" rx="3" className="box" />
        <text x="180" y="130" textAnchor="middle" className="label-primary">
          Storage
        </text>
        <text x="180" y="145" textAnchor="middle" className="label-secondary">
          Versioned
        </text>

        {/* Change Detection */}
        <rect x="140" y="180" width="80" height="50" rx="3" className="box" />
        <text x="180" y="200" textAnchor="middle" className="label-primary">
          Detect
        </text>
        <text x="180" y="215" textAnchor="middle" className="label-secondary">
          Changes
        </text>

        {/* Arrows between */}
        <path className="arrow" d="M 180 90 L 180 110" markerEnd="url(#arrowSmall)" />
        <path className="arrow" d="M 180 160 L 180 180" markerEnd="url(#arrowSmall)" />
      </g>

      {/* Right Column: Access & Output */}
      <g>
        <text x="320" y="25" className="label-secondary">
          Access
        </text>

        {/* API */}
        <rect x="270" y="40" width="80" height="50" rx="3" className="box" />
        <text x="310" y="60" textAnchor="middle" className="label-primary">
          REST API
        </text>
        <text x="310" y="75" textAnchor="middle" className="label-secondary">
          Query DSL
        </text>

        {/* Consumers */}
        <rect x="270" y="110" width="80" height="50" rx="3" className="box" />
        <text x="310" y="135" textAnchor="middle" className="label-secondary">
          Researchers
        </text>

        {/* Archive */}
        <rect x="270" y="180" width="80" height="50" rx="3" className="box" />
        <text x="310" y="200" textAnchor="middle" className="label-primary">
          Archive
        </text>
        <text x="310" y="215" textAnchor="middle" className="label-secondary">
          Export
        </text>

        {/* Arrows */}
        <path className="arrow" d="M 310 90 L 310 110" markerEnd="url(#arrowSmall)" />
        <path className="arrow" d="M 310 160 L 310 180" markerEnd="url(#arrowSmall)" />
      </g>

      {/* Horizontal data flow arrows */}
      <path className="arrow" d="M 90 65 L 140 65" markerEnd="url(#arrowSmall)" />
      <path className="arrow" d="M 220 135 L 270 135" markerEnd="url(#arrowSmall)" />
      <path className="arrow" d="M 90 195 L 140 205" markerEnd="url(#arrowSmall)" />

      {/* Far right: Tech stack visualization */}
      <g>
        <text x="400" y="25" className="label-secondary">
          Infrastructure
        </text>

        {/* Stack items */}
        {[
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Redis",
          "Docker",
        ].map((tech, i) => (
          <g key={tech}>
            <circle cx="410" cy={55 + i * 30} r="3" className="dot" />
            <text
              x="420"
              y={60 + i * 30}
              className="label-secondary"
            >
              {tech}
            </text>
          </g>
        ))}
      </g>

      {/* Right side: Metrics/Stats */}
      <g>
        <text x="540" y="25" className="label-secondary">
          Scale & Impact
        </text>

        {/* Stat boxes */}
        <rect
          x="520"
          y="40"
          width="70"
          height="45"
          rx="3"
          className="box-accent"
        />
        <text x="555" y="55" textAnchor="middle" className="label-primary">
          89%
        </text>
        <text x="555" y="70" textAnchor="middle" className="label-secondary">
          Accuracy
        </text>

        <rect
          x="600"
          y="40"
          width="70"
          height="45"
          rx="3"
          className="box-accent"
        />
        <text x="635" y="55" textAnchor="middle" className="label-primary">
          &lt;100ms
        </text>
        <text x="635" y="70" textAnchor="middle" className="label-secondary">
          Latency
        </text>

        <rect
          x="680"
          y="40"
          width="70"
          height="45"
          rx="3"
          className="box-accent"
        />
        <text x="715" y="55" textAnchor="middle" className="label-primary">
          2 Systems
        </text>
        <text x="715" y="70" textAnchor="middle" className="label-secondary">
          Production
        </text>

        {/* Key principles */}
        <text x="540" y="130" className="label-secondary">
          Core Principles
        </text>

        {[
          "Change tracking",
          "Auditable",
          "Reliable",
        ].map((principle, i) => (
          <g key={principle}>
            <circle cx="545" cy={150 + i * 25} r="2" fill="#1a1a1a" />
            <text
              x="555"
              y={155 + i * 25}
              className="label-secondary"
            >
              {principle}
            </text>
          </g>
        ))}
      </g>

      {/* Decorative accent: Connection nodes */}
      <circle cx="130" cy="65" r="2" fill="#1a1a1a" opacity="0.15" />
      <circle cx="250" cy="135" r="2" fill="#1a1a1a" opacity="0.15" />
      <circle cx="130" cy="205" r="2" fill="#1a1a1a" opacity="0.15" />
    </svg>
  );
}
