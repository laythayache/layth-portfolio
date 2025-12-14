import Section from "@/components/Section";
import { experience } from "@/content/experience";

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Selected Work & Leadership"
      subtitle="Building products and delivering results"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {experience.map((exp, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {exp.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {exp.organization}
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-500 mt-2 md:mt-0">
                {exp.period}
              </span>
            </div>

            <ul className="space-y-2 mb-4">
              {exp.description.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-gray-700 dark:text-gray-300 flex items-start"
                >
                  <span className="mr-2 text-gray-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

