import { useEffect } from "react";
import WordLoader from "@/components/Home/WordLoader";
import ScrollIndicator from "@/components/Layout/Scrollindicator";
import Emblem from "@/components/UI/Emblem";
import { motion } from "framer-motion";

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "Layth Ayache — Public Learning";
  }, []);

  return (
    <>
      {/* Hero Section - Manifesto State */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Centered Emblem - Large */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-1 w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
        >
          <Emblem size="centered" className="w-full h-full" />
        </motion.div>

        {/* Word Loader */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full flex justify-center"
        >
          <WordLoader />
        </motion.div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Below the fold content */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-center"
        >
          <h2 className="font-mono text-2xl md:text-3xl font-medium mb-8 text-foreground">
            Manifesto
          </h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              This is not a portfolio. This is a timeline.
            </p>
            <p>
              Every project here exists in relation to time — when it was conceived, 
              how long it took to break, and what emerged from the fragments.
            </p>
            <p>
              Process is the product. Failure is data. 
              The only constant is forward motion.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Third section - Navigation prompt */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Navigate the timeline
          </p>
          <div className="flex items-center gap-8 text-foreground font-mono text-lg">
            <span className="text-muted-foreground">←</span>
            <span>Past</span>
            <span className="text-accent">•</span>
            <span>Future</span>
            <span className="text-muted-foreground">→</span>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Index;
