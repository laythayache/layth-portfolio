import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import NotFound from "@/pages/NotFound";

// Lazy-loaded route components for code splitting
const Home = lazy(() => import("@/pages/Home"));
const Explore = lazy(() => import("@/pages/Explore"));
const About = lazy(() => import("@/pages/About"));
const Submit = lazy(() => import("@/pages/Submit"));
const Playbook = lazy(() => import("@/pages/Playbook"));
const Now = lazy(() => import("@/pages/Now"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const OmnisignMicrosite = lazy(() => import("@/pages/OmnisignMicrosite"));
const Writing = lazy(() => import("@/pages/Writing"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          {/* Primary routes */}
          <Route path="/systems" element={<Explore />} />
          <Route path="/playbook" element={<Playbook />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/now" element={<Now />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Submit />} />

          {/* Backward compatibility redirects */}
          <Route path="/explore" element={<Navigate to="/systems" replace />} />
          <Route path="/submit" element={<Navigate to="/contact" replace />} />

          {/* Legacy redirect routes */}
          <Route
            path="/completed"
            element={<Navigate to="/systems?status=completed" replace />}
          />
          <Route
            path="/ongoing"
            element={<Navigate to="/systems?status=ongoing" replace />}
          />
          <Route
            path="/friends"
            element={<Navigate to="/systems?friends=true" replace />}
          />

          {/* Project detail routes */}
          <Route
            path="/projects/omnisign"
            element={<OmnisignMicrosite />}
          />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
