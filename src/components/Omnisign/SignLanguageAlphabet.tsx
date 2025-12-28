import { useState } from "react";
import { motion } from "framer-motion";

const alphabetSigns = [
  { letter: "A", gesture: "✊", description: "Closed fist with thumb beside" },
  { letter: "B", gesture: "🖐️", description: "Flat hand, fingers together" },
  { letter: "C", gesture: "🤏", description: "Curved hand, thumb and index form C" },
  { letter: "D", gesture: "👆", description: "Index finger pointing up" },
  { letter: "E", gesture: "✋", description: "Fist with thumb across fingers" },
  { letter: "I", gesture: "☝️", description: "Pinky finger extended" },
  { letter: "L", gesture: "👈", description: "Index and thumb form L shape" },
  { letter: "O", gesture: "👌", description: "Thumb and index form circle" },
  { letter: "V", gesture: "✌️", description: "Index and middle finger extended" },
  { letter: "Y", gesture: "🤘", description: "Pinky and thumb extended" },
];

const SignLanguageAlphabet = () => {
  const [activeSign, setActiveSign] = useState<string | null>(null);

  return (
    <div className="w-full mt-16">
      <h3 className="font-mono text-2xl font-medium text-foreground mb-8 text-center">
        Explore Sign Language Alphabet
      </h3>
      
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4 max-w-4xl mx-auto">
        {alphabetSigns.map((sign) => (
          <motion.button
            key={sign.letter}
            onClick={() => setActiveSign(activeSign === sign.letter ? null : sign.letter)}
            onFocus={() => setActiveSign(sign.letter)}
            onBlur={() => setActiveSign(null)}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              activeSign === sign.letter
                ? "border-primary bg-primary/10 scale-110 shadow-lg"
                : "border-border hover:border-primary/40 hover:scale-105"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`${sign.letter}: ${sign.description}`}
          >
            <div className="text-4xl mb-2">{sign.gesture}</div>
            <div className="font-mono text-sm font-medium text-foreground">{sign.letter}</div>
          </motion.button>
        ))}
      </div>

      {/* Description Panel */}
      {activeSign && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-card border-2 border-primary/20 rounded-lg max-w-md mx-auto text-center"
        >
          <p className="font-mono text-lg font-medium text-foreground mb-2">
            {alphabetSigns.find((s) => s.letter === activeSign)?.letter}
          </p>
          <p className="text-muted-foreground">
            {alphabetSigns.find((s) => s.letter === activeSign)?.description}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SignLanguageAlphabet;

