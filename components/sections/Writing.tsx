import Section from "@/components/Section";
import { writing } from "@/content/writing";

export default function Writing() {
  return (
    <Section
      id="writing"
      title="Writing & Research"
      subtitle="Technical notes, research reviews, and documentation"
      className="bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {writing.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                  {item.type}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                {item.year}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {item.description}
            </p>
            {item.link && item.link !== "#" && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white hover:underline font-medium"
              >
                Read more →
              </a>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}

