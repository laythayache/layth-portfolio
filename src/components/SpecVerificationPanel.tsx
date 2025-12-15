"use client";

import { useEffect, useState } from "react";
import { SpecVerifier, VerificationResult } from "@/utils/specVerification";

export default function SpecVerificationPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [lastRun, setLastRun] = useState<Date | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }

    // Check if debug mode is enabled
    const checkDebug = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const debugParam = urlParams.get("debug") === "1";
      const debugStorage = localStorage.getItem("DEBUG_EXPERIENCE") === "1";
      return debugParam || debugStorage;
    };

    setIsVisible(checkDebug());

    // Run verifications
    const runVerifications = () => {
      const verifier = new SpecVerifier();
      const verificationResults = verifier.runAllVerifications();
      setResults(verificationResults);
      setLastRun(new Date());

      // Log failures
      const failures = verificationResults.filter((r) => !r.passed);
      if (failures.length > 0) {
        console.warn("Spec Verification Failures:", failures);
      } else {
        console.log("✅ All spec verifications passed!");
      }
    };

    // Run immediately and then periodically
    runVerifications();
    const interval = setInterval(runVerifications, 2000);

    // Also run on window resize
    window.addEventListener("resize", runVerifications);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", runVerifications);
    };
  }, []);

  if (!isVisible || process.env.NODE_ENV === "production") {
    return null;
  }

  const passed = results.filter((r) => r.passed).length;
  const total = results.length;
  const allPassed = passed === total;

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 10000,
        backgroundColor: allPassed ? "rgba(0, 200, 0, 0.9)" : "rgba(200, 0, 0, 0.9)",
        color: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        fontSize: "12px",
        fontFamily: "monospace",
        maxWidth: "500px",
        maxHeight: "80vh",
        overflow: "auto",
        border: `2px solid ${allPassed ? "#00ff00" : "#ff0000"}`,
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "0.5rem", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "0.5rem" }}>
        ✅ Spec Verification: {passed}/{total} passed
        {lastRun && (
          <div style={{ fontSize: "10px", fontWeight: "normal", marginTop: "0.25rem" }}>
            Last run: {lastRun.toLocaleTimeString()}
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontSize: "11px" }}>
        {results.map((result, index) => (
          <div
            key={index}
            style={{
              padding: "0.25rem 0.5rem",
              backgroundColor: result.passed ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
              borderRadius: "4px",
            }}
          >
            {result.passed ? "✅" : "❌"} {result.message}
            {result.details && (
              <div style={{ marginLeft: "1rem", fontSize: "10px", opacity: 0.8 }}>
                {JSON.stringify(result.details)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

