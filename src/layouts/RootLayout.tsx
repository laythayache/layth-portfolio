import { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function RootLayout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <Outlet />
      </main>
    </>
  );
}
