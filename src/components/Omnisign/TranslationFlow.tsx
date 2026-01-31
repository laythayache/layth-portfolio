import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Volume2, Type } from "lucide-react";
import { ArrowRight } from "lucide-react";

const translations = [
  { sign: "👋", text: "Hello", spoken: "Hello!" },
  { sign: "🙏", text: "Thank you", spoken: "Thank you!" },
  { sign: "✌️", text: "Peace", spoken: "Peace!" },
  { sign: "👍", text: "Good", spoken: "Good!" },
  { sign: "❤️", text: "Love", spoken: "I love you!" },
];

const TranslationFlow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = translations[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % translations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <h3 className="font-mono text-2xl font-medium text-foreground mb-4 text-center">
        Real-Time Translation Flow
      </h3>
      <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
        Sign-to-Text, Sign-to-Speech, and Text-to-Speech translation
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
        {/* Sign Input */}
        <motion.div
          key={`sign-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full md:w-64 p-8 border-2 border-border rounded-lg bg-card text-center"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {current.sign}
          </motion.div>
          <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Sign Input</p>
        </motion.div>

        {/* Arrow */}
        <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />

        {/* AI Processing */}
        <motion.div
          key={`ai-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full md:w-64 p-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border-2 border-primary/30 text-center relative overflow-hidden"
        >
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
          <motion.p
            key={current.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xl font-medium text-foreground mb-2"
          >
            {current.text}
          </motion.p>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Federated Model Processing</p>
        </motion.div>

        {/* Arrow */}
        <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />

        {/* Output */}
        <motion.div
          key={`output-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full md:w-64 p-8 border-2 border-border rounded-lg bg-card text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Type className="w-6 h-6 text-foreground" />
            <Volume2 className="w-6 h-6 text-foreground" />
          </div>
          <motion.p
            key={current.spoken}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xl font-medium text-foreground mb-2"
          >
            {current.spoken}
          </motion.p>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Text & Speech Output</p>
        </motion.div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {translations.map((_, index) => (
          <button
            key={`dot-${index}`}
            aria-label={`Go to translation ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-primary w-8" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TranslationFlow;

