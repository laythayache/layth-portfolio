"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

interface PerformanceMetrics {
  fps: number;
  frameTime: number; // ms
  droppedFrames: number;
  longTasks: number;
}

const FPS_SAMPLE_SIZE = 60; // 1 second at 60fps
const DROPPED_FRAME_THRESHOLD = 20; // ms (50fps)
const LONG_TASK_THRESHOLD = 50; // ms

/**
 * Performance Monitor Component
 * 
 * Tracks FPS, frame time, dropped frames, and long tasks.
 * Only active in development mode or when RR_PERF_MONITOR env var is set.
 */
export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    droppedFrames: 0,
    longTasks: 0,
  });

  const frameTimeHistoryRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const droppedFramesRef = useRef<number>(0);
  const longTasksRef = useRef<number>(0);
  const observerRef = useRef<PerformanceObserver | null>(null);

  // Check if monitoring should be enabled
  const isEnabled =
    process.env.NODE_ENV === "development" ||
    (typeof window !== "undefined" && window.localStorage.getItem("RR_PERF_MONITOR") === "true");

  // Long Task Observer (if supported)
  useEffect(() => {
    if (!isEnabled || typeof window === "undefined") return;

    if ("PerformanceObserver" in window) {
      try {
        observerRef.current = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > LONG_TASK_THRESHOLD) {
              longTasksRef.current += 1;
            }
          }
        });
        observerRef.current.observe({ entryTypes: ["longtask"] });
      } catch (e) {
        // Long task API not supported or failed
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isEnabled]);

  // Frame time tracking
  useFrame(() => {
    if (!isEnabled) return;
    
    // Pause when tab is hidden
    if (typeof document !== "undefined" && document.hidden) return;

    const now = performance.now();
    const frameTime = now - lastFrameTimeRef.current;
    lastFrameTimeRef.current = now;

    // Track frame times
    frameTimeHistoryRef.current.push(frameTime);
    if (frameTimeHistoryRef.current.length > FPS_SAMPLE_SIZE) {
      frameTimeHistoryRef.current.shift();
    }

    // Count dropped frames
    if (frameTime > DROPPED_FRAME_THRESHOLD) {
      droppedFramesRef.current += 1;
    }

    // Update metrics every 60 frames (roughly 1 second)
    if (frameTimeHistoryRef.current.length === FPS_SAMPLE_SIZE) {
      const avgFrameTime =
        frameTimeHistoryRef.current.reduce((a, b) => a + b, 0) / FPS_SAMPLE_SIZE;
      const fps = 1000 / avgFrameTime;

      setMetrics({
        fps: Math.round(fps * 10) / 10,
        frameTime: Math.round(avgFrameTime * 100) / 100,
        droppedFrames: droppedFramesRef.current,
        longTasks: longTasksRef.current,
      });

      // Reset counters (but keep history for smooth updates)
      droppedFramesRef.current = 0;
      longTasksRef.current = 0;
      
      // Export frame time for DRS (if available globally)
      if (typeof window !== "undefined" && (window as any).__rr_frameTimeHistory) {
        (window as any).__rr_frameTimeHistory.push(...frameTimeHistoryRef.current.slice(-10));
      }
    }
  });

  if (!isEnabled) return null;

  // Determine color based on performance
  const getColor = () => {
    if (metrics.fps >= 55) return "#00ff00"; // Green
    if (metrics.fps >= 45) return "#ffff00"; // Yellow
    if (metrics.fps >= 30) return "#ff8800"; // Orange
    return "#ff0000"; // Red
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "8px",
        right: "8px",
        zIndex: 9999,
        fontFamily: "monospace",
        fontSize: "10px",
        color: "#ffffff",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "6px 8px",
        borderRadius: "4px",
        pointerEvents: "none",
        userSelect: "none",
        lineHeight: "1.4",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "2px" }}>PERF MONITOR</div>
      <div>
        FPS: <span style={{ color: getColor() }}>{metrics.fps.toFixed(1)}</span>
      </div>
      <div>
        Frame: <span style={{ color: getColor() }}>{metrics.frameTime.toFixed(2)}ms</span>
      </div>
      <div>Dropped: {metrics.droppedFrames}</div>
      {metrics.longTasks > 0 && <div>Long Tasks: {metrics.longTasks}</div>}
    </div>
  );
}
