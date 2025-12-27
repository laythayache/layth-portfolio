import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { usePageDirection } from "@/hooks/usePageDirection";
import Navbar from "@/components/Navigation/Navbar";
import PageTransition from "@/components/Layout/PageTransition";
import Index from "./pages/Index";
import Completed from "./pages/Completed";
import Ongoing from "./pages/Ongoing";
import Friends from "./pages/Friends";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const { direction } = usePageDirection();

  // Show navbar when scrolled or not on home page
  const showNavbar = isScrolled || location.pathname !== "/";

  // Check if on project detail page (uses fade instead of slide)
  const isProjectPage = location.pathname.startsWith("/projects/");

  return (
    <>
      <Navbar isVisible={showNavbar} />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          {isProjectPage ? (
            <Routes location={location} key={location.pathname}>
              <Route path="/projects/:slug" element={<ProjectDetail />} />
            </Routes>
          ) : (
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition direction={direction}>
                    <Index />
                  </PageTransition>
                }
              />
              <Route
                path="/completed"
                element={
                  <PageTransition direction={direction}>
                    <Completed />
                  </PageTransition>
                }
              />
              <Route
                path="/ongoing"
                element={
                  <PageTransition direction={direction}>
                    <Ongoing />
                  </PageTransition>
                }
              />
              <Route
                path="/friends"
                element={
                  <PageTransition direction={direction}>
                    <Friends />
                  </PageTransition>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
