import Section from "@/components/Section";

export default function About() {
  return (
    <Section
      id="about"
      title="About"
      subtitle="Building AI systems that solve real problems"
      className="bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-3xl mx-auto space-y-6 text-gray-700 dark:text-gray-300">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            What I Do
          </h3>
          <p className="mb-4">
            I specialize in building end-to-end AI and ML systems, with a focus on Computer Vision and Natural Language Processing. 
            My work spans from research and experimentation to production deployment, always considering real-world constraints 
            and practical implementation challenges.
          </p>
          <p className="mb-4">
            I have particular expertise in Arabic and Lebanese contexts, building solutions that work with under-resourced languages 
            and regional data challenges. My projects range from sign language translation systems to fashion trend detection, 
            housing price prediction, and retail analytics—each demonstrating a commitment to shipping working products.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            How I Work
          </h3>
          <p className="mb-4">
            I approach projects with a structured, iterative methodology. Every system I build starts with clear problem definition, 
            followed by systematic exploration of approaches, rigorous evaluation, and continuous iteration based on feedback.
          </p>
          <p className="mb-4">
            I believe in measurable outcomes and clear documentation. Whether it's a research project or a production system, 
            I ensure that decisions are data-driven, results are reproducible, and the work is well-documented for future reference.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Where I'm Heading
          </h3>
          <p className="mb-4">
            I'm actively seeking roles in AI Engineering, ML Engineering, Computer Vision, and Data Analysis—with a focus on 
            opportunities in the Gulf region and remote positions. I'm particularly interested in roles that combine technical 
            depth with product ownership, where I can contribute to both the technical architecture and the strategic direction.
          </p>
          <p>
            I'm open to collaborations, consulting opportunities, and full-time positions that allow me to work on meaningful 
            problems with measurable impact. If you're building something interesting in AI/ML, I'd love to hear about it.
          </p>
        </div>
      </div>
    </Section>
  );
}

