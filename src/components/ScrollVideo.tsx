import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/motion/useMediaQuery";

const VIDEO_SRC = "/scroll-bg.mp4";
const POSTER_SRC = "/scroll-bg-poster.jpg";

/**
 * Full-viewport background video whose playback is driven by scroll position.
 * Scrolling from top to bottom scrubs the video from 0 → duration.
 *
 * Degrades gracefully:
 * - Mobile / coarse pointer: static poster only (no video seeking)
 * - prefers-reduced-motion: static poster only
 * - Video load failure: poster image remains visible
 */
export default function ScrollVideo() {
  const reduced = useReducedMotion();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const mobileViewport = useMediaQuery("(max-width: 767px)");
  const disableVideo = reduced || coarsePointer || mobileViewport;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    if (!video || !video.duration || disableVideo) return;
    video.currentTime = progress * video.duration;
  });

  return (
    <div
      className="scroll-video-wrapper pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      {/* Poster fallback — always rendered, fades out once video is ready */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: `url(${POSTER_SRC})`,
          opacity: ready && !disableVideo ? 0 : 1,
        }}
      />

      {/* Scrubbed video — hidden on mobile / reduced-motion */}
      {!disableVideo && (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setReady(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.7s ease" }}
        />
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-slate-950/40" />
    </div>
  );
}
