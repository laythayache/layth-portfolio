"use client";

import { forwardRef, useRef } from "react";
import LogoMark from "./LogoMark";

interface LockupProps {
  mode: "loader" | "hero";
  showMotto?: boolean;
  mottoText?: string;
  showCtas?: boolean;
  nameLeft?: string;
  nameRight?: string;
  markSizeVar: "--mark-loader" | "--mark-hero";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode; // For CTAs or custom motto
  "data-phase"?: string; // For choreography phase tracking
}

/**
 * Canonical Lockup component used by both loader and hero
 * Stable vertical stack - no absolute positioning that can overlap
 */
const Lockup = forwardRef<HTMLDivElement, LockupProps>(
  (
    {
      mode,
      showMotto = false,
      mottoText = "grow to love and love to grow",
      showCtas = false,
      nameLeft = "LAYTH",
      nameRight = "AYACHE",
      markSizeVar,
      className = "",
      style,
      children,
      "data-phase": dataPhase,
    },
    ref
  ) => {
    const measureGroupRef = useRef<HTMLDivElement>(null);

    // Extract spin class from className if present
    const spinClassMatch = className.match(/isSpinning|stopSpin/);
    const spinClass = spinClassMatch ? spinClassMatch[0] : '';
    
    // Expose measure group ref - use callback ref to forward to parent ref
    const setMeasureRef = (node: HTMLDivElement | null) => {
      // Forward to parent ref if provided
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && typeof ref === 'object' && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };
    
    return (
      <div 
        className={`lockup lockup--${mode} ${className}`} 
        style={style}
        data-phase={dataPhase}
      >
        <div ref={setMeasureRef} className="lockup__measure-group">
          {/* Emblem */}
          <div className="lockup__mark-wrapper" style={{ width: `var(${markSizeVar})`, height: `var(${markSizeVar})` }}>
            <LogoMark size={0} className={spinClass} />
          </div>

          {/* Names - only shown in loader mode during choreography */}
          {mode === "loader" && (
            <>
              <div className="lockup__name lockup__name--left">{nameLeft}</div>
              <div className="lockup__name lockup__name--right">{nameRight}</div>
            </>
          )}

          {/* Name - only shown in hero mode */}
          {mode === "hero" && (
            <h1 className="lockup__name lockup__name--hero">{nameLeft} {nameRight}</h1>
          )}
        </div>

        {/* Motto - can be custom children or default text */}
        {showMotto && !children && (
          <p className="lockup__motto">{mottoText}</p>
        )}
        {showMotto && children && (
          <div className="lockup__motto">{children}</div>
        )}

        {/* CTAs */}
        {showCtas && children && !showMotto && (
          <div className="lockup__ctas">{children}</div>
        )}
      </div>
    );
  }
);

Lockup.displayName = "Lockup";

export default Lockup;

