import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
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
const About = lazy(() => import("@/pages/About"));
const Speaking = lazy(() => import("@/pages/Speaking"));
const Credentials = lazy(() => import("@/pages/Credentials"));
const Admin = lazy(() => import("@/pages/Admin"));

export default function App() {
  useRemoveStaticJsonLd();
  return (
    <ErrorBoundary>
      <BrowserRouter>
      <Routes>
        {/* Standalone admin CMS — no public nav/footer */}
        <Route path="/admin" element={<Suspense fallback={null}><Admin /></Suspense>} />
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/credentials" element={<Credentials />} />
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
          <Route path="/certifications" element={<Navigate to="/credentials" replace />} />
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
    </ErrorBoundary>
  );
}
