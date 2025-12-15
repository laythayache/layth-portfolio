"use client";

import { forwardRef } from "react";
import LogoMark from "./LogoMark";

interface LockupProps {
  className?: string;
  emblemSize?: number;
  showText?: boolean;
  textClassName?: string;
  emblemClassName?: string;
}

const Lockup = forwardRef<HTMLDivElement, LockupProps>(
  ({ className = "", emblemSize = 200, showText = true, textClassName = "", emblemClassName = "" }, ref) => {
    return (
      <div ref={ref} className={className}>
        {/* Text container (behind the mark) */}
        {showText && (
          <div className="lockup__text-wrapper">
            <div className={`lockup__text lockup__text--layth ${textClassName}`}>
              LAYTH
            </div>
            <div className={`lockup__text lockup__text--ayache ${textClassName}`}>
              AYACHE
            </div>
          </div>
        )}

        {/* Mark (in front, acts as mask/occluder) */}
        <div className="lockup__mark-wrapper">
          <LogoMark className={`lockup__mark ${emblemClassName}`} size={emblemSize} />
        </div>
      </div>
    );
  }
);

Lockup.displayName = "Lockup";

export default Lockup;

