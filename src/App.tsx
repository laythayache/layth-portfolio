import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import NotFound from "@/pages/NotFound";

const Home = lazy(() => import("@/pages/Home"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const OmnisignMicrosite = lazy(() => import("@/pages/OmnisignMicrosite"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          {/* Project detail routes (preserved for backlinks) */}
          <Route
            path="/projects/omnisign"
            element={<OmnisignMicrosite />}
          />
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          {/* Backward compatibility redirects → homepage */}
          <Route path="/lab" element={<Navigate to="/" replace />} />
          <Route path="/experiments" element={<Navigate to="/" replace />} />
          <Route path="/thinking" element={<Navigate to="/" replace />} />
          <Route path="/systems" element={<Navigate to="/" replace />} />
          <Route path="/explore" element={<Navigate to="/" replace />} />
          <Route path="/writing" element={<Navigate to="/" replace />} />
          <Route path="/playbook" element={<Navigate to="/" replace />} />
          <Route path="/now" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="/submit" element={<Navigate to="/#contact" replace />} />

          {/* Legacy filter routes */}
          <Route path="/completed" element={<Navigate to="/" replace />} />
          <Route path="/ongoing" element={<Navigate to="/" replace />} />
          <Route path="/friends" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
