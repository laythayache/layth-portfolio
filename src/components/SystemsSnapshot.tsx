/**
 * Elegant systems architecture visualization
 * Flowing data pipeline: Collection → Processing → Access
 * Spacious, clean, with staggered animations
 */

import { motion } from 'framer-motion';

export default function SystemsSnapshot() {
  return (
    <div className="relative w-full">
      <div className="space-y-16">
        {/* Collection → Processing → Access flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Collection Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0 }}
            className="space-y-8"
          >
            <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted">
              Collection
            </h3>
            <div className="space-y-6">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-surface-raised border border-border p-6 rounded-lg text-sm text-text-secondary hover:border-border-strong hover:scale-[1.02] transition-all"
              >
                Media sources
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-px h-8 bg-gradient-to-b from-border-strong to-transparent mx-auto"
              />

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-surface-raised border border-border p-6 rounded-lg text-sm text-text-secondary hover:border-border-strong hover:scale-[1.02] transition-all"
              >
                Scrape & detect
              </motion.div>
            </div>
          </motion.div>

          {/* Processing Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="space-y-8"
          >
            <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted">
              Processing
            </h3>
            <div className="space-y-6">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-surface-raised border border-border p-6 rounded-lg text-sm text-text-secondary hover:border-border-strong hover:scale-[1.02] transition-all"
              >
                Normalize schema
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="w-px h-8 bg-gradient-to-b from-border-strong to-transparent mx-auto"
              />

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-surface-raised border border-border p-6 rounded-lg text-sm text-text-secondary hover:border-border-strong hover:scale-[1.02] transition-all"
              >
                Version & store
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="w-px h-8 bg-gradient-to-b from-border-strong to-transparent mx-auto"
              />

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-surface-raised border border-border p-6 rounded-lg text-sm text-text-secondary hover:border-border-strong hover:scale-[1.02] transition-all"
              >
                Monitor changes
              </motion.div>
            </div>
          </motion.div>

          {/* Access Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="space-y-8"
          >
            <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted">
              Access
            </h3>
            <div className="space-y-6">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-surface-raised border border-border p-6 rounded-lg text-sm text-text-secondary hover:border-border-strong hover:scale-[1.02] transition-all"
              >
                REST API
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="w-px h-8 bg-gradient-to-b from-border-strong to-transparent mx-auto"
              />

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-surface-raised border border-border p-6 rounded-lg text-sm text-text-secondary hover:border-border-strong hover:scale-[1.02] transition-all"
              >
                Serve data
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Key principles at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.45 }}
          className="pt-12 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              "Change tracked",
              "Versioned",
              "Auditable",
              "Reliable",
            ].map((principle, idx) => (
              <motion.div
                key={principle}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 + idx * 0.1 }}
              >
                <div className="text-text-muted font-mono text-xs uppercase tracking-wider">
                  {principle}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
