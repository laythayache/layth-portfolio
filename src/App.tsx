import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import NotFound from "@/pages/NotFound";

// Lazy-loaded route components for code splitting
const Home = lazy(() => import("@/pages/Home"));
const Lab = lazy(() => import("@/pages/Lab"));
const Experiments = lazy(() => import("@/pages/Experiments"));
const Thinking = lazy(() => import("@/pages/Thinking"));
const About = lazy(() => import("@/pages/About"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const OmnisignMicrosite = lazy(() => import("@/pages/OmnisignMicrosite"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          {/* Primary routes */}
          <Route path="/lab" element={<Lab />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/thinking" element={<Thinking />} />
          <Route path="/about" element={<About />} />

          {/* Backward compatibility redirects */}
          <Route path="/systems" element={<Navigate to="/lab" replace />} />
          <Route path="/explore" element={<Navigate to="/lab" replace />} />
          <Route path="/writing" element={<Navigate to="/thinking" replace />} />
          <Route path="/playbook" element={<Navigate to="/" replace />} />
          <Route path="/now" element={<Navigate to="/" replace />} />
          <Route path="/contact" element={<Navigate to="/about" replace />} />
          <Route path="/submit" element={<Navigate to="/about" replace />} />

          {/* Legacy redirect routes */}
          <Route
            path="/completed"
            element={<Navigate to="/lab?status=completed" replace />}
          />
          <Route
            path="/ongoing"
            element={<Navigate to="/lab?status=ongoing" replace />}
          />
          <Route
            path="/friends"
            element={<Navigate to="/lab?friends=true" replace />}
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
