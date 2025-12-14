import Section from "@/components/Section";
import { profile } from "@/content/profile";

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Get in Touch"
      subtitle="Open to opportunities, collaborations, and interesting problems"
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          I'm actively seeking roles in AI Engineering, Computer Vision, NLP, and Data Analysis—with a focus on 
          opportunities in the Gulf region and remote positions. I'm also open to collaborations, consulting opportunities, 
          and discussions about interesting problems in AI/ML.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href={`mailto:${profile.email}`}
            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Email Me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            What I'm Open To
          </h3>
          <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2 max-w-md mx-auto">
            <li>• AI Engineer / ML Engineer roles (Gulf-focused or remote)</li>
            <li>• Computer Vision & NLP positions</li>
            <li>• Data Analyst / Data Scientist opportunities</li>
            <li>• Product-focused engineering roles</li>
            <li>• Research collaborations</li>
            <li>• Consulting and freelance projects</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

