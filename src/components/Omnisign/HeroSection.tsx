import { motion, useReducedMotion } from "framer-motion";
import NDABadge from "./NDABadge";
import CharacterScramble from "./CharacterScramble";
import MagneticButton from "./MagneticButton";

const HeroSection = () => {
  const floatingEmojis = [
    { emoji: "👋", x: "10%", y: "20%", delay: 0 },
    { emoji: "🤟", x: "85%", y: "15%", delay: 0.2 },
    { emoji: "✌️", x: "15%", y: "70%", delay: 0.4 },
    { emoji: "🙏", x: "80%", y: "65%", delay: 0.6 },
    { emoji: "👍", x: "50%", y: "10%", delay: 0.8 },
    { emoji: "❤️", x: "90%", y: "80%", delay: 1 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Emojis */}
      {floatingEmojis.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl md:text-6xl opacity-20"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-xs uppercase tracking-widest text-foreground">
              AI-Powered Sign Language Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              <CharacterScramble text="Breaking Barriers," delay={0.4} />
            </span>
            <br />
            <span className="text-foreground">
              <CharacterScramble text="Building Bridges" delay={0.4} />
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Real-time sign language translation powered by AI. Connect, communicate, and break down language barriers with OmniSign.
          </motion.p>

          {/* Hero Video */}
          {import.meta.env.VITE_OMNISIGN_VIDEO_URL && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-12 max-w-4xl mx-auto"
            >
              <div className="relative w-full rounded-lg overflow-hidden border-2 border-border/30 bg-background/50 shadow-lg">
                <NDABadge />
                <video
                  className="w-full h-auto"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={import.meta.env.VITE_OMNISIGN_VIDEO_URL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex justify-center items-center gap-4 mb-16"
          >
            <MagneticButton
              href="/projects/omnisign/contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-mono text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/50"
            >
              Try OmniSign Free
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 gap-8 max-w-xl mx-auto"
          >
            <div>
              <div className="font-mono text-3xl md:text-4xl font-bold text-foreground mb-2">98%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Accuracy</div>
            </div>
            <div>
              <div className="font-mono text-sm md:text-base font-bold text-foreground mb-2 leading-tight">ASL & LSL</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">American & Lebanese Sign Language</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-foreground/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

