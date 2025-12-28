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
      className={`absolute -top-[10px] -right-[10px] z-30 ${className}`}
    >
      <div className="bg-accent text-accent-foreground px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-lg border-2 border-accent-foreground/20 flex items-center gap-1.5 md:gap-2 font-mono text-[9px] md:text-xs font-bold uppercase tracking-wider scale-90 md:scale-100">
        <FileText className="w-2.5 h-2.5 md:w-3 md:h-3" />
        <span className="whitespace-nowrap">Enterprise Access: Available upon NDA</span>
      </div>
    </motion.div>
  );
};

export default NDABadge;

