import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./styles/index.css";

const rootElement = document.getElementById("root")!;
// Build-time route HTML gives non-JS crawlers meaningful content. React owns
// the same root once the application loads.
rootElement.replaceChildren();

createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
