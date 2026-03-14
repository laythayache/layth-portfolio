import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import { SYSTEM_PROMPT } from "./functions/api/system-prompt";
import type { Plugin } from "vite";

/**
 * Dev-only plugin that proxies /api/chat to OpenAI so the chatbot works
 * in local dev without Cloudflare Wrangler.
 */
function chatApiDevProxy(): Plugin {
  return {
    name: "chat-api-dev-proxy",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405);
          res.end();
          return;
        }

        const env = loadEnv("development", process.cwd(), "");
        const apiKey = env.OPENAI_API_KEY;
        if (!apiKey) {
          res.writeHead(503, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "OPENAI_API_KEY not set in .env" }));
          return;
        }

        let body = "";
        for await (const chunk of req) body += chunk;

        let parsed: { messages?: Array<{ role: string; content: string }> };
        try {
          parsed = JSON.parse(body);
        } catch {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid request body." }));
          return;
        }

        if (!Array.isArray(parsed.messages) || parsed.messages.length === 0) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Messages array is required." }));
          return;
        }

        const messages = parsed.messages.slice(-20);

        try {
          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                  { role: "system", content: SYSTEM_PROMPT },
                  ...messages,
                ],
                stream: true,
                max_tokens: 300,
                temperature: 0.7,
              }),
            }
          );

          if (!response.ok) {
            const text = await response.text();
            res.writeHead(502, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "AI service error.", detail: text }));
            return;
          }

          res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          });

          const reader = response.body?.getReader();
          if (reader) {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(value);
            }
          }
          res.end();
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Proxy error", detail: String(err) }));
        }
      });
    },
  };
}

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "out",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-xyflow": ["@xyflow/react"],
          "vendor-icons": ["lucide-react"],
        },
      },
    },
  },
  plugins: [
    chatApiDevProxy(),
    react(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: "stats.html",
    }),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
  },
});
