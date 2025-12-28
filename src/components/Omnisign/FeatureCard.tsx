import { motion } from "framer-motion";
import { LucideIcon, FileText } from "lucide-react";
import { useState } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor?: "primary" | "accent";
  delay?: number;
  requiresNDA?: boolean;
  isHighlighted?: boolean;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  accentColor = "primary", 
  delay = 0,
  requiresNDA = false,
  isHighlighted = false,
}: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPrimary = accentColor === "primary";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`relative p-6 rounded-lg border-2 bg-card transition-all duration-300 hover:scale-105 overflow-hidden ${
        isHighlighted
          ? "border-accent/40 hover:border-accent/60 bg-accent/5 shadow-lg shadow-accent/10"
          : isPrimary 
            ? "border-primary/20 hover:border-primary/40" 
            : "border-accent/20 hover:border-accent/40"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Neural Pulse Effect for Privacy Protected card */}
      {isHighlighted && isHovered && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full border-2 border-accent/40 pointer-events-none"
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ 
            width: 300, 
            height: 300, 
            opacity: 0,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      )}
      {/* NDA Badge */}
      {requiresNDA && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
          viewport={{ once: true }}
          className="absolute -top-2 -right-2 z-10"
        >
          <div className="bg-accent text-accent-foreground px-2 py-1 rounded-md shadow-md border border-accent-foreground/20 flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider">
            <FileText className="w-2.5 h-2.5" />
            <span>NDA</span>
          </div>
        </motion.div>
      )}

      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
        isHighlighted
          ? "bg-accent/20"
          : isPrimary 
            ? "bg-primary/10" 
            : "bg-accent/10"
      }`}>
        <Icon className={`w-6 h-6 ${
          isHighlighted
            ? "text-accent"
            : isPrimary 
              ? "text-primary" 
              : "text-accent"
        }`} />
      </div>
      <h3 className="font-mono text-xl font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      
      {/* NDA Access Text */}
      {requiresNDA && (
        <p className="mt-3 font-mono text-xs text-accent font-medium uppercase tracking-wider">
          Request Access (NDA Required)
        </p>
      )}
    </motion.div>
  );
};

export default FeatureCard;

