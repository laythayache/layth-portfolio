import Section from "@/components/Section";

const skillCategories = [
  {
    title: "AI/ML",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Machine Learning",
      "Deep Learning",
      "Model Training & Evaluation",
    ],
  },
  {
    title: "Computer Vision",
    skills: [
      "Image Processing",
      "Object Detection",
      "Image Classification",
      "Feature Extraction",
      "CV Pipelines",
    ],
  },
  {
    title: "NLP / Arabic Dialects",
    skills: [
      "Natural Language Processing",
      "Arabic NLP",
      "Text Analysis",
      "Language Models",
      "Multilingual Systems",
    ],
  },
  {
    title: "Data",
    skills: [
      "Pandas",
      "NumPy",
      "Data Visualization",
      "Statistical Analysis",
      "Data Pipelines",
      "Feature Engineering",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "Python",
      "REST APIs",
      "Microservices",
      "System Design",
      "API Integration",
    ],
  },
  {
    title: "Mobile & Integration",
    skills: [
      "Android Development",
      "Mobile Integration",
      "Cross-platform Development",
    ],
  },
  {
    title: "DevOps/Cloud",
    skills: [
      "Cloud Deployment",
      "CI/CD Basics",
      "Containerization",
      "Version Control",
    ],
  },
  {
    title: "Cyber/Networking",
    skills: [
      "Network Security",
      "Security Analysis",
      "Ethical Research",
    ],
  },
];

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Technical expertise across the ML stack"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {category.title}
            </h3>
            <ul className="space-y-2">
              {category.skills.map((skill, skillIndex) => (
                <li
                  key={skillIndex}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  • {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

