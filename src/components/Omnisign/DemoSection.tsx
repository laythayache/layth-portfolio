import { motion } from "framer-motion";
import TranslationFlow from "./TranslationFlow";

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <TranslationFlow />
      </div>
    </section>
  );
};

export default DemoSection;

