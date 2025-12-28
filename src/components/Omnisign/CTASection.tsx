import { motion } from "framer-motion";
import { Mail, Github, Twitter } from "lucide-react";

const CTASection = () => {
  const floatingEmojis = [
    { emoji: "🤟", x: "10%", y: "20%", delay: 0 },
    { emoji: "👋", x: "85%", y: "15%", delay: 0.3 },
    { emoji: "❤️", x: "15%", y: "70%", delay: 0.6 },
  ];

  return (
    <section className="relative py-20 md:py-32 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20" />
      
      {/* Blur Decorations */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

      {/* Floating Emojis */}
      {floatingEmojis.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl md:text-6xl opacity-20"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
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

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-mono text-4xl md:text-6xl font-bold text-foreground mb-6">
            Ready to Break Barriers?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of users who are transforming communication with OmniSign
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="/projects/omnisign/contact"
              className="px-8 py-4 bg-foreground text-background rounded-full font-mono text-sm uppercase tracking-widest hover:bg-foreground/90 transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="/projects/omnisign/contact"
              className="px-8 py-4 border-2 border-foreground rounded-full font-mono text-sm uppercase tracking-widest hover:bg-foreground/10 transition-colors"
            >
              Contact Sales
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <a
              href="mailto:hello@omnisign.ai"
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-foreground" />
            </a>
            <a
              href="https://github.com/omnisign"
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-foreground" />
            </a>
            <a
              href="https://twitter.com/omnisign"
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-foreground" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

