import { lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import NotFound from "@/pages/NotFound";

/** Remove the static JSON-LD injected by inject-meta.mjs once React hydrates,
 *  so the dynamic React Helmet version becomes the single source of truth. */
function useRemoveStaticJsonLd() {
  useEffect(() => {
    document.getElementById("static-jsonld")?.remove();
  }, []);
}

const Home = lazy(() => import("@/pages/Home"));
const ProjectMicrosite = lazy(() => import("@/pages/ProjectMicrosite"));
const OmnisignMicrosite = lazy(() => import("@/pages/OmnisignMicrosite"));
const BlogIndex = lazy(() => import("@/pages/BlogIndex"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const BeyondTech = lazy(() => import("@/pages/BeyondTech"));
const ProjectsIndex = lazy(() => import("@/pages/ProjectsIndex"));

export default function App() {
  useRemoveStaticJsonLd();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/beyond-tech" element={<BeyondTech />} />

          {/* Projects listing + detail routes */}
          <Route path="/projects" element={<ProjectsIndex />} />
          <Route
            path="/projects/omnisign"
            element={<OmnisignMicrosite />}
          />
          <Route path="/projects/:slug" element={<ProjectMicrosite />} />

          {/* Backward compatibility redirects → homepage */}
          <Route path="/lab" element={<Navigate to="/" replace />} />
          <Route path="/experiments" element={<Navigate to="/" replace />} />
          <Route path="/thinking" element={<Navigate to="/" replace />} />
          <Route path="/systems" element={<Navigate to="/" replace />} />
          <Route path="/explore" element={<Navigate to="/" replace />} />
          <Route path="/writing" element={<Navigate to="/blog" replace />} />
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
