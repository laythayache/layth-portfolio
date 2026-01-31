import { motion, useScroll, useTransform, useReducedMotion, useMotionTemplate, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

// Timeline Thread Component
const TimelineThread = ({ progress, prefersReducedMotion }: { progress: MotionValue<number>, prefersReducedMotion: boolean | null }) => {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  
  return (
    <motion.div 
      className="absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-0.5 bg-border/50 hidden sm:block origin-top"
      style={{
        scaleY: prefersReducedMotion ? 1 : scaleY,
      }}
    />
  );
};

// Neural Pulse Component
const NeuralPulse = () => {
  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent/40"
        animate={{
          width: [0, 400, 0],
          height: [0, 400, 0],
          opacity: [0.8, 0, 0.8],
        }}
        transition={{ duration: 3, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
      />
    </div>
  );
};

const LearningLSLSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [card5InView, setCard5InView] = useState(false);
  const [scanLineColor, setScanLineColor] = useState("rgb(239, 68, 68)"); // red
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll progress for cards section (0 to 1 as user scrolls through cards)
  const { scrollYProgress: cardsScrollProgress } = useScroll({
    target: cardsRef,
    offset: ["start center", "end center"],
  });

  // Transform scroll progress to image filter values
  // Cards 1-4: blur 12px → 0px, grayscale 100% → 0%
  const imageBlur = useTransform(
    cardsScrollProgress,
    [0, 0.8], // Map to 80% of scroll (Cards 1-4)
    [12, 0]
  );
  const imageGrayscale = useTransform(
    cardsScrollProgress,
    [0, 0.8],
    [100, 0]
  );
  const imageFilter = useMotionTemplate`blur(${imageBlur}px) grayscale(${imageGrayscale}%)`;

  // Trigger success animation when Card 5 comes into view
  useEffect(() => {
    if (card5InView) {
      setScanLineColor("rgb(34, 197, 94)"); // green
    } else {
      setScanLineColor("rgb(239, 68, 68)"); // red
    }
  }, [card5InView]);

  const storyCards = [
    {
      id: 1,
      title: "A Language Without a Map",
      body: "Lebanese Sign Language (LSL) is not unified. Regional dialects and inconsistent usage across Lebanon make standardization a massive hurdle for technology.",
      isSuccess: false,
    },
    {
      id: 2,
      title: "The Invisible Language",
      body: "While languages like ASL have millions of data points, LSL has historically had zero public datasets. AI cannot learn what isn't documented.",
      isSuccess: false,
    },
    {
      id: 3,
      title: "A History of Failed Starts",
      body: "Many have tried to bridge this gap. Countless initiatives have collapsed under resource constraints and technical complexity, leaving the community waiting.",
      isSuccess: false,
    },
    {
      id: 4,
      title: "An Urgent Silence",
      body: "To this day, the lack of digital tools for LSL remains a critical barrier to education, employment, and social inclusion in Lebanon.",
      isSuccess: false,
    },
    {
      id: 5,
      title: "The First Milestone",
      body: "We have successfully built the first-ever LSL dataset. While currently limited in context and vocabulary, it is the first functional foundation in history.",
      isSuccess: true,
    },
    {
      id: 6,
      title: "Build the Future With Us",
      body: "Scaling this project requires more than code—it requires community, data, and funding. Join us in mapping the future of Lebanese communication.",
      isSuccess: false,
    },
  ];

  return (
    <motion.section 
      className="py-12 sm:py-16 md:py-20 lg:py-32 px-6 sm:px-12 lg:px-24 transition-colors duration-1000"
      ref={containerRef}
      style={{
        backgroundColor: card5InView 
          ? "hsl(142 70% 5% / 0.2)" 
          : "hsl(var(--muted) / 0.3)",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            The LSL Mission
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A journey from fragmentation to the first functional foundation
          </p>
        </motion.div>

        {/* Responsive Layout: Vertical Stack on Mobile, Two-Column on Desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Side - Digital Frame (Top on Mobile, Sticky on Desktop) */}
          <div className="w-full lg:sticky lg:top-24 order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Digital Frame Container */}
              <div className="relative p-6 border-4 border-accent/40 rounded-lg bg-gradient-to-br from-card via-card/95 to-card/90 shadow-2xl backdrop-blur-sm">
                {/* AI Scanning Interface Elements */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                
                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-accent" />
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-accent" />
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-accent" />
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-accent" />

                {/* Scanning Line Animation */}
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                  style={{ zIndex: 10 }}
                >
                  <motion.div
                    className="absolute left-0 right-0 h-1"
                    style={{
                      background: `linear-gradient(to bottom, ${scanLineColor}40, ${scanLineColor}, ${scanLineColor}40)`,
                      boxShadow: `0 0 10px ${scanLineColor}80`,
                    }}
                    animate={{
                      top: ["0%", "100%", "0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                {/* Image with scroll-based filter */}
                <div className="relative z-0">
                  <motion.img
                    src="/arabic-sign-language-alphabet.png"
                    alt="Chart showing Arabic Sign Language gestures used as a basis for the LSL dataset"
                    className="w-full h-auto rounded-md"
                    style={
                      prefersReducedMotion
                        ? undefined
                        : { filter: imageFilter as any }
                    }
                  />
                </div>

                {/* Label */}
                <div className="mt-4 text-center">
                  <p className="font-mono text-sm font-medium text-foreground">
                    Core Reference: Arabic Sign Language Foundation
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Scrolling Story Cards */}
          <div className="w-full order-2 lg:order-2 relative" ref={cardsRef}>
            {/* Timeline Thread - Animated Drawing (Left-aligned on Mobile) */}
            <TimelineThread progress={cardsScrollProgress} prefersReducedMotion={prefersReducedMotion} />
            
            {/* Story Cards */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {storyCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-100px" }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  onViewportEnter={() => {
                    if (card.id === 5) {
                      setCard5InView(true);
                    }
                  }}
                  onViewportLeave={() => {
                    if (card.id === 5) {
                      setCard5InView(false);
                    }
                  }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 sm:left-6 lg:left-0 top-6 -translate-x-[calc(1rem+2px)] lg:-translate-x-[calc(2rem+2px)] hidden sm:block">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      card.isSuccess 
                        ? 'bg-accent border-accent shadow-lg shadow-accent/50' 
                        : 'bg-background border-border'
                    }`}>
                      {card.isSuccess && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-3 h-3 text-foreground" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <motion.div
                    className={`relative pl-12 sm:pl-14 lg:pl-16 pr-4 sm:pr-6 py-6 sm:py-8 rounded-lg border-2 transition-all duration-300 ${
                      card.isSuccess
                        ? 'border-accent bg-gradient-to-br from-card via-card to-accent/10 shadow-xl shadow-accent/20'
                        : 'border-border bg-card hover:border-accent/50'
                    }`}
                    whileHover={card.isSuccess ? { scale: 1.02 } : {}}
                  >
                    {/* Neural Pulse Effect for Card 5 */}
                    {card.isSuccess && <NeuralPulse />}
                    
                    {/* Success Glow Effect */}
                    {card.isSuccess && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-lg bg-accent/10 pointer-events-none"
                      />
                    )}

                    {/* Card Content */}
                    <div className="relative z-10">
                      <h3 className="font-mono text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
                        {card.body}
                      </p>
                    </div>

                    {/* Success Indicator */}
                    {card.isSuccess && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute top-4 right-4"
                      >
                        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent">
                          <CheckCircle2 className="w-6 h-6 text-accent" />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LearningLSLSection;
