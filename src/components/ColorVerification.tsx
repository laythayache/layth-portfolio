"use client";

import { useEffect } from "react";

/**
 * Dev-only color verification component
 * Logs computed styles for key elements to confirm tokens are applied correctly
 */
export default function ColorVerification() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const verifyBrandColors = () => {
      const body = document.body;
      const bodyBg = window.getComputedStyle(body).backgroundColor;
      const bodyColor = window.getComputedStyle(body).color;
      
      // Find emblem SVG
      const emblem = document.querySelector('.logo-mark, .lockup__mark') as SVGElement;
      const emblemStroke = emblem ? window.getComputedStyle(emblem).color : null;
      
      // Find primary heading
      const heading = document.querySelector('h1') as HTMLElement;
      const headingColor = heading ? window.getComputedStyle(heading).color : null;

      console.group('🎨 Brand Color Verification');
      console.log('Body background:', bodyBg);
      console.log('Expected (day): rgb(237, 231, 221)');
      console.log('Match:', bodyBg === 'rgb(237, 231, 221)' || bodyBg === 'rgb(43, 46, 52)');
      
      console.log('\nBody text color:', bodyColor);
      console.log('Expected (day): rgb(43, 46, 52)');
      console.log('Match:', bodyColor === 'rgb(43, 46, 52)' || bodyColor === 'rgb(237, 231, 221)');
      
      if (emblemStroke) {
        console.log('\nEmblem stroke:', emblemStroke);
        console.log('Expected: rgb(107, 114, 128)');
        console.log('Match:', emblemStroke === 'rgb(107, 114, 128)');
      }
      
      if (headingColor) {
        console.log('\nPrimary heading color:', headingColor);
        console.log('Expected (day): rgb(43, 46, 52)');
        console.log('Match:', headingColor === 'rgb(43, 46, 52)' || headingColor === 'rgb(237, 231, 221)');
      }
      
      console.groupEnd();
    };

    // Run after a delay to ensure styles are applied
    const timeout = setTimeout(verifyBrandColors, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  return null;
}

