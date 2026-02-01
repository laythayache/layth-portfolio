import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import About from "@/pages/About";
import Submit from "@/pages/Submit";
import ProjectDetail from "@/pages/ProjectDetail";
import OmnisignMicrosite from "@/pages/OmnisignMicrosite";
import OmnisignContact from "@/pages/OmnisignContact";
import Systems from "@/pages/Systems";
import SystemDetail from "@/pages/SystemDetail";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/submit" element={<Submit />} />
          <Route
            path="/completed"
            element={<Navigate to="/explore?status=completed" replace />}
          />
          <Route
            path="/ongoing"
            element={<Navigate to="/explore?status=ongoing" replace />}
          />
          <Route
            path="/friends"
            element={<Navigate to="/explore?friends=true" replace />}
          />
          <Route
            path="/projects/omnisign/contact"
            element={<OmnisignContact />}
          />
          <Route
            path="/projects/omnisign"
            element={<OmnisignMicrosite />}
          />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/systems/:slug" element={<SystemDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
