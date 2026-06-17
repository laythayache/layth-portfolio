import { lazy, Suspense, useEffect, type ComponentType } from "react";
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

const RELOAD_KEY = "chunkReloadAt";

/** Lazy import that survives stale code-split chunks after a deploy.
 *  When you ship often, an already-open tab holds a shell that points at the
 *  previous build's hashed chunks; navigating to a lazy route then fetches a
 *  chunk the new deploy removed, the import rejects, and the page goes blank.
 *  Here we reload once to pull the fresh shell — so it resolves itself with no
 *  manual refresh. A timestamp guard stops a genuinely-missing chunk looping. */
function lazyWithReload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() =>
    factory().catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      const isChunkError =
        /dynamically imported module|loading chunk|failed to fetch|module script failed/i.test(msg);
      const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
      if (isChunkError && Date.now() - last > 10000) {
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
        window.location.reload();
        return new Promise<{ default: T }>(() => {}); // hold render until the reload lands
      }
      throw err;
    })
  );
}

const Home = lazyWithReload(() => import("@/pages/Home"));
const ProjectMicrosite = lazyWithReload(() => import("@/pages/ProjectMicrosite"));
const OmnisignMicrosite = lazyWithReload(() => import("@/pages/OmnisignMicrosite"));
const BlogIndex = lazyWithReload(() => import("@/pages/BlogIndex"));
const BlogPost = lazyWithReload(() => import("@/pages/BlogPost"));
const BeyondTech = lazyWithReload(() => import("@/pages/BeyondTech"));
const ProjectsIndex = lazyWithReload(() => import("@/pages/ProjectsIndex"));
const About = lazyWithReload(() => import("@/pages/About"));
const Speaking = lazyWithReload(() => import("@/pages/Speaking"));
const Credentials = lazyWithReload(() => import("@/pages/Credentials"));
const Admin = lazyWithReload(() => import("@/pages/Admin"));
const FAQ = lazyWithReload(() => import("@/pages/FAQ"));

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
          <Route path="/faq" element={<FAQ />} />

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
