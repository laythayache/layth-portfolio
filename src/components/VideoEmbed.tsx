import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

interface VideoEmbedProps {
  src: string;
  poster?: string;
  title: string;
}

export default function VideoEmbed({ src, poster, title }: VideoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function handlePlayClick() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.muted = false;
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl border border-border bg-surface-overlay"
    >
      <div className="relative aspect-video w-full">
        {inView ? (
          <>
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              preload="metadata"
              poster={poster}
              controls={isPlaying}
              aria-label={title}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support HTML video playback.
            </video>
            {!isPlaying && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center"
                aria-label={`Play ${title}`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform hover:scale-110">
                  <Play size={24} className="ml-0.5 text-accent" />
                </span>
              </button>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-surface-raised">
            <Play size={32} className="text-text-muted" aria-hidden />
          </div>
        )}
      </div>
    </div>
  );
}
