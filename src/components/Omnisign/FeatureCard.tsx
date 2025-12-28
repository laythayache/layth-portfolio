import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor?: "primary" | "accent";
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, accentColor = "primary", delay = 0 }: FeatureCardProps) => {
  const isPrimary = accentColor === "primary";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`p-6 rounded-lg border-2 bg-card transition-all duration-300 hover:scale-105 ${
        isPrimary 
          ? "border-primary/20 hover:border-primary/40" 
          : "border-accent/20 hover:border-accent/40"
      }`}
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
        isPrimary ? "bg-primary/10" : "bg-accent/10"
      }`}>
        <Icon className={`w-6 h-6 ${isPrimary ? "text-primary" : "text-accent"}`} />
      </div>
      <h3 className="font-mono text-xl font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;

