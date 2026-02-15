import { useEffect, Suspense } from "react";
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
        <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-sm text-text-muted">Loading...</div></div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
