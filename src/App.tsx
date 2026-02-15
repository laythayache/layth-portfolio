import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import About from "@/pages/About";
import Submit from "@/pages/Submit";
import Playbook from "@/pages/Playbook";
import Now from "@/pages/Now";
import ProjectDetail from "@/pages/ProjectDetail";
import OmnisignMicrosite from "@/pages/OmnisignMicrosite";
import SystemDetail from "@/pages/SystemDetail";
import Writing from "@/pages/Writing";
import NotFound from "@/pages/NotFound";

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

          {/* System category routes (for future use) */}
          <Route path="/systems-category/:slug" element={<SystemDetail />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
