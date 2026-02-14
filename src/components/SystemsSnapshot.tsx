/**
 * Elegant systems architecture visualization
 * Minimal, clean, focused on clarity
 */

export default function SystemsSnapshot() {
  return (
    <div className="relative w-full">
      <div className="space-y-8">
        {/* Collection → Processing → Access flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Collection */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/40">
              Collection
            </div>
            <div className="space-y-3">
              <div className="p-4 border border-[#1A1A1A]/10 rounded-lg text-sm">
                Media sources
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#1A1A1A]/30 to-transparent mx-auto" />
              <div className="p-4 border border-[#1A1A1A]/10 rounded-lg text-sm">
                Scrape & detect
              </div>
            </div>
          </div>

          {/* Processing */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/40">
              Processing
            </div>
            <div className="space-y-3">
              <div className="p-4 border border-[#1A1A1A]/10 rounded-lg text-sm">
                Normalize schema
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#1A1A1A]/30 to-transparent mx-auto" />
              <div className="p-4 border border-[#1A1A1A]/10 rounded-lg text-sm">
                Version & store
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#1A1A1A]/30 to-transparent mx-auto" />
              <div className="p-4 border border-[#1A1A1A]/10 rounded-lg text-sm">
                Monitor changes
              </div>
            </div>
          </div>

          {/* Access */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#1A1A1A]/40">
              Access
            </div>
            <div className="space-y-3">
              <div className="p-4 border border-[#1A1A1A]/10 rounded-lg text-sm">
                REST API
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-[#1A1A1A]/30 to-transparent mx-auto" />
              <div className="p-4 border border-[#1A1A1A]/10 rounded-lg text-sm">
                Serve data
              </div>
            </div>
          </div>
        </div>

        {/* Key principles at bottom */}
        <div className="pt-4 border-t border-[#1A1A1A]/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Change tracked",
              "Versioned",
              "Auditable",
              "Reliable",
            ].map((principle) => (
              <div key={principle} className="text-xs">
                <div className="text-[#1A1A1A]/40 font-mono uppercase tracking-wider mb-2">
                  {principle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
