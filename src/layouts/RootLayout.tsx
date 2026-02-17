import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import RouteTransition from "@/motion/RouteTransition";
import CinematicCursor from "@/components/CinematicCursor";
import ChatBot from "@/components/ChatBot";
import LenisProvider, { useLenis } from "@/motion/LenisProvider";

function ScrollToTop() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis, location.pathname]);

  return null;
}

export default function RootLayout() {
  return (
    <LenisProvider>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <ScrollToTop />
      <CinematicCursor />
      <Navbar />
      <RouteTransition />
      <ChatBot />
    </LenisProvider>
  );
}
