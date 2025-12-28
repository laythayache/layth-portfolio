import { motion } from "framer-motion";
import { Video, Brain, Users, GraduationCap, Accessibility, Globe, Zap, Shield } from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: Video,
      title: "Real-Time Translation",
      description: "Computer vision for video calls with instant sign language recognition and translation.",
      accentColor: "primary" as const,
    },
    {
      icon: Brain,
      title: "AI Language Model",
      description: "Neural networks trained on diverse sign language datasets for 98% accuracy.",
      accentColor: "accent" as const,
    },
    {
      icon: Users,
      title: "Bidirectional Communication",
      description: "Sign-to-Text, Sign-to-Speech, and Text-to-Speech translation for seamless conversations.",
      accentColor: "primary" as const,
    },
    {
      icon: GraduationCap,
      title: "Learning Platform",
      description: "Interactive lessons, progress tracking, and personalized learning paths.",
      accentColor: "accent" as const,
      requiresNDA: true,
    },
    {
      icon: Accessibility,
      title: "Accessibility First",
      description: "WCAG compliant, haptic feedback, and full screen reader support.",
      accentColor: "primary" as const,
    },
    {
      icon: Globe,
      title: "ASL & Lebanese Sign Language (LSL)",
      description: "Dedicated support for American Sign Language (ASL) and Lebanese Sign Language (LSL).",
      accentColor: "accent" as const,
    },
    {
      icon: Zap,
      title: "Low Latency",
      description: "Under 100ms response time with edge computing for real-time communication.",
      accentColor: "primary" as const,
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description: "Privacy-first architecture using Edge Computing and a Federated Learning model. Your sign data never leaves your device.",
      accentColor: "accent" as const,
      isHighlighted: true,
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for seamless sign language communication
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accentColor={feature.accentColor}
              delay={index * 0.1}
              requiresNDA={feature.requiresNDA}
              isHighlighted={feature.isHighlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

