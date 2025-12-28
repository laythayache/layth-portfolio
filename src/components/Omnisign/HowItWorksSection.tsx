import { motion } from "framer-motion";
import { Camera, Cpu, MessageSquare, Check } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Camera,
      number: 1,
      title: "Capture",
      description: "Computer vision captures gestures in real-time from video input.",
      gradient: "from-primary to-primary/60",
    },
    {
      icon: Cpu,
      number: 2,
      title: "Process",
      description: "Federated Model processing analyzes context, grammar, and temporal patterns to understand meaning.",
      gradient: "from-accent to-accent/60",
    },
    {
      icon: MessageSquare,
      number: 3,
      title: "Translate",
      description: "Neural networks convert gestures to text and generate speech output.",
      gradient: "from-primary to-primary/60",
    },
    {
      icon: Check,
      number: 4,
      title: "Connect",
      description: "Real-time bidirectional communication enables seamless conversations.",
      gradient: "from-accent to-accent/60",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple, powerful process powered by advanced AI
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line - Desktop only */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Number Circle */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-foreground flex items-center justify-center z-10">
                  <span className="font-mono text-sm font-bold text-foreground">{step.number}</span>
                </div>

                {/* Icon Container */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="font-mono text-xl font-medium text-foreground mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

