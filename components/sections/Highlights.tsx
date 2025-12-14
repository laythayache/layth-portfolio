import { profile } from "@/content/profile";
import Section from "@/components/Section";

export default function Highlights() {
  return (
    <Section id="highlights" className="bg-white dark:bg-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {profile.highlights.map((highlight, index) => (
          <div
            key={index}
            className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {highlight.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {highlight.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

