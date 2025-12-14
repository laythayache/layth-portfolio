export interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    title: "Product Builder / Independent Projects",
    organization: "Freelance & Personal Projects",
    period: "2023 - Present",
    description: [
      "Built end-to-end ML products from concept to deployment, including Lebanese Sign Language translation system, fashion trend detection, and automation tools.",
      "Designed pricing models, deployment strategies, and iteration cycles based on user feedback and market needs.",
      "Demonstrated ownership across the full product lifecycle: requirements gathering, system design, implementation, testing, and deployment.",
    ],
    tags: ["Product Management", "System Design", "Full-Stack Development", "Deployment"],
  },
  {
    title: "Research Writing & Technical Reporting",
    organization: "Academic & Professional",
    period: "2023 - Present",
    description: [
      "Produced structured technical reports and research documentation for ML projects, including literature reviews, methodology documentation, and results analysis.",
      "Wrote clear, actionable documentation that bridges technical depth with stakeholder communication.",
      "Created reproducible research workflows with proper version control and documentation practices.",
    ],
    tags: ["Technical Writing", "Research", "Documentation", "Communication"],
  },
  {
    title: "Team Collaboration & Delivery",
    organization: "Project-Based Teams",
    period: "2023 - Present",
    description: [
      "Collaborated on cross-functional teams to deliver ML projects, managing requirements, timelines, and stakeholder expectations.",
      "Practiced iterative development with regular feedback loops and measurable outcomes.",
      "Led technical discussions and contributed to architecture decisions, balancing technical excellence with practical constraints.",
    ],
    tags: ["Collaboration", "Agile", "Leadership", "Communication"],
  },
];

