"use client";

import BrandLockup from "./brand/BrandLockup";
import { useBrandSequence } from "./brand/BrandSequenceProvider";

export default function Header() {
  const { state, restart } = useBrandSequence();
  const isIdle = state === "idle";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-slate/10">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <BrandLockup
          variant="header"
          showWordmark={true}
          interactive={isIdle}
          onClick={restart}
        />
      </div>
    </header>
  );
}
