export interface Writing {
  title: string;
  type: "Review" | "Report" | "Article" | "Documentation";
  description: string;
  year: string;
  link?: string;
}

export const writing: Writing[] = [
  {
    title: "AI/ML Applications in Healthcare: A Literature Review",
    type: "Review",
    description: "Comprehensive survey of current AI/ML applications in healthcare, covering computer vision for medical imaging, NLP for clinical notes, and predictive modeling. Focus on practical implementations and challenges.",
    year: "2024",
    link: "#",
  },
  {
    title: "Sign Language Recognition: Technical Approaches and Challenges",
    type: "Article",
    description: "Technical deep-dive into sign language recognition systems, comparing CV approaches, discussing data collection challenges, and exploring mobile deployment strategies. Focus on under-resourced languages.",
    year: "2024",
    link: "#",
  },
  {
    title: "End-to-End ML Pipeline Documentation",
    type: "Documentation",
    description: "Structured documentation for building production ML pipelines, covering data collection, preprocessing, model training, evaluation, and deployment. Includes best practices and common pitfalls.",
    year: "2024",
    link: "#",
  },
  {
    title: "Arabic NLP: Challenges and Opportunities",
    type: "Article",
    description: "Analysis of Arabic NLP challenges including dialectal variation, script complexity, and resource scarcity. Discussion of practical approaches for Arabic language processing in real-world applications.",
    year: "2024",
    link: "#",
  },
];

