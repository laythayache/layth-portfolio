import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface NDABadgeProps {
  className?: string;
}

const NDABadge = ({ className = "" }: NDABadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: -5 }}
      whileHover={{ scale: 1.05, rotate: -3 }}
      className={`absolute top-4 right-4 z-20 ${className}`}
    >
      <div className="bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg border-2 border-accent-foreground/20 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
        <FileText className="w-3 h-3" />
        <span>Enterprise Access: Available upon NDA</span>
      </div>
    </motion.div>
  );
};

export default NDABadge;

