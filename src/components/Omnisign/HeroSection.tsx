import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import CharacterScramble from "./CharacterScramble";
import MagneticButton from "./MagneticButton";

const HeroSection = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // Skip animations, show everything immediately
      setShowIntro(true);
      setShowVideo(true);
      setShowRest(true);
      return;
    }

    // Sequence: Intro shows → disappears → Video shows → Rest shows
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3000); // Show intro for 3 seconds

    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 3500); // Video appears 0.5s after intro disappears

    const restTimer = setTimeout(() => {
      setShowRest(true);
    }, 4000); // Rest appears 0.5s after video

    return () => {
      clearTimeout(introTimer);
      clearTimeout(videoTimer);
      clearTimeout(restTimer);
    };
  }, [prefersReducedMotion]);
  // Reduce emojis on mobile: 4 on mobile, 6 on desktop
  const floatingEmojis = [
    { emoji: "👋", x: "10%", y: "20%", delay: 0, showOnMobile: true },
    { emoji: "🤟", x: "85%", y: "15%", delay: 0.2, showOnMobile: true },
    { emoji: "✌️", x: "15%", y: "70%", delay: 0.4, showOnMobile: true },
    { emoji: "🙏", x: "80%", y: "65%", delay: 0.6, showOnMobile: true },
    { emoji: "👍", x: "50%", y: "10%", delay: 0.8, showOnMobile: false },
    { emoji: "❤️", x: "90%", y: "80%", delay: 1, showOnMobile: false },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden py-12 md:py-16 lg:py-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Emojis - Reduced on Mobile */}
      {floatingEmojis.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute text-3xl sm:text-4xl md:text-6xl opacity-20 ${item.showOnMobile ? 'block' : 'hidden md:block'}`}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -10, 0], // Reduced travel on mobile
            rotate: [0, 5, -5, 0], // Reduced rotation
            scale: [1, 1.05, 1], // Reduced scale
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

      <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10 flex-1 flex flex-col">
        {/* Top Section: Intro Text - Appears first, then disappears */}
        <AnimatePresence mode="wait">
          {showIntro && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6 md:mb-8"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-foreground">
                  AI-Powered Sign Language Platform
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-mono text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6"
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
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
              >
                Real-time sign language translation powered by AI. Connect, communicate, and break down language barriers with OmniSign.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle Section: Video - Appears after intro disappears */}
        <AnimatePresence>
          {showVideo && import.meta.env.VITE_OMNISIGN_VIDEO_URL && (
            <motion.div
              key="video"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 flex items-center justify-center mb-4 sm:mb-6 md:mb-8"
            >
              <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden border-2 border-border/30 bg-background/50 shadow-lg aspect-video">
                <video
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                  autoPlay
                  muted
                >
                  <source src={import.meta.env.VITE_OMNISIGN_VIDEO_URL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Section: CTAs and Stats - Appears after video */}
        <AnimatePresence>
          {showRest && (
            <motion.div
              key="rest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center gap-4 mb-6 sm:mb-8 md:mb-12"
              >
                <MagneticButton
                  href="/projects/omnisign/contact"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-full font-mono text-xs sm:text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/50 text-center"
                >
                  Try OmniSign Free
                </MagneticButton>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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
            </motion.div>
          )}
        </AnimatePresence>
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

