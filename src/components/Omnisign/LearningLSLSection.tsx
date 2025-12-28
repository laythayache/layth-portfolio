import { motion } from "framer-motion";

const LearningLSLSection = () => {
  return (
    <section className="py-20 md:py-32 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-4">
            Learning LSL
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the complete Arabic sign language alphabet used in Lebanese Sign Language (LSL). 
            Each gesture represents a letter in the Arabic alphabet, forming the foundation of LSL communication.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="rounded-lg overflow-hidden border-2 border-border shadow-lg bg-card p-4 md:p-6">
            <img
              src="/arabic-sign-language-alphabet.png"
              alt="Arabic Sign Language Alphabet - Complete chart showing all Arabic letters and their corresponding sign language gestures used in Lebanese Sign Language (LSL)"
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Complete reference chart for Arabic sign language alphabet gestures used in Lebanese Sign Language (LSL)
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LearningLSLSection;

