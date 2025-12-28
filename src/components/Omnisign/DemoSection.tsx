import { motion } from "framer-motion";
import TranslationFlow from "./TranslationFlow";

const DemoSection = () => {
  return (
    <section id="demo" className="py-20 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <TranslationFlow />
        
        {/* Interactive Sign Experience Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <h3 className="font-mono text-3xl md:text-4xl font-medium text-foreground mb-4">
              Interactive Sign Experience
            </h3>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-16 text-center">
              <p className="font-mono text-xl text-muted-foreground">
                Coming Soon
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;

