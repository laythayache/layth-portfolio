import { motion } from "framer-motion";
import { Video, Users, GraduationCap, HandHeart, Globe, Zap, Shield, Cpu, Network } from "lucide-react";
import FeatureCard from "./FeatureCard";

// Custom Federated/Distributed Icon - Three connected nodes
const FederatedIcon = ({ className, size = 24, ...props }: { className?: string; size?: number; [key: string]: any }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Three connected nodes representing federated learning */}
    <circle cx="8" cy="8" r="3" />
    <circle cx="16" cy="8" r="3" />
    <circle cx="12" cy="16" r="3" />
    {/* Connection lines */}
    <line x1="9.5" y1="9.5" x2="13.5" y2="13.5" />
    <line x1="14.5" y1="9.5" x2="10.5" y2="13.5" />
    <line x1="8" y1="11" x2="12" y2="13" />
    <line x1="16" y1="11" x2="12" y2="13" />
  </svg>
);

// Custom Edge Security Icon - Shield with circuit pattern
const EdgeSecurityIcon = ({ className, size = 24, ...props }: { className?: string; size?: number; [key: string]: any }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {/* Shield base */}
    <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
    {/* Circuit pattern - representing edge computing */}
    <rect x="8" y="9" width="2" height="2" fill="currentColor" />
    <rect x="14" y="9" width="2" height="2" fill="currentColor" />
    <line x1="10" y1="8" x2="10" y2="13" />
    <line x1="14" y1="8" x2="14" y2="13" />
    <line x1="8" y1="11" x2="16" y2="11" />
  </svg>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Video,
      title: "Real-Time Translation",
      description: "Computer vision for video calls with instant sign language recognition and translation.",
      accentColor: "primary" as const,
    },
    {
      icon: FederatedIcon,
      title: "AI Language Model",
      description: "Neural networks trained on diverse sign language datasets for 98% accuracy.",
      accentColor: "accent" as const,
      requiresNDA: true,
    },
    {
      icon: Users,
      title: "Multi-Modal Output",
      description: "Translate signs into real-time Text and Speech, with integrated Text-to-Speech support for listeners.",
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
      icon: HandHeart,
      title: "Accessibility First",
      description: "WCAG compliant, haptic feedback, and full screen reader support.",
      accentColor: "primary" as const,
    },
    {
      icon: Globe,
      title: "American & Lebanese Sign Language (LSL)",
      description: "Dedicated support for American Sign Language (ASL) and Lebanese Sign Language (LSL).",
      accentColor: "accent" as const,
      requiresNDA: true,
    },
    {
      icon: Zap,
      title: "Low Latency",
      description: "Under 100ms response time with edge computing for real-time communication.",
      accentColor: "primary" as const,
    },
    {
      icon: EdgeSecurityIcon,
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

