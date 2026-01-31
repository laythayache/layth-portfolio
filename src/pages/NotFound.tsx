import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle("404 — Layth Ayache");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen items-center justify-center"
    >
      <div className="text-center px-6">
        <h1 className="font-mono text-6xl md:text-8xl font-medium text-foreground mb-4">
          404
        </h1>
        <p className="font-mono text-lg text-muted-foreground mb-8">
          This page doesn't exist yet.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-4 border border-border rounded-lg hover:border-foreground/30 transition-all duration-300 font-mono text-sm uppercase tracking-widest"
        >
          Return home
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
