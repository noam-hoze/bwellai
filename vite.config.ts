import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  worker: {
    format: "es",
  },
  server: {
    host: "::",
    port: 8080,
    headers: {
      //"Cross-Origin-Opener-Policy": "same-origin",
      //"Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
    middlewareMode: true,
    configureServer: (server: any) => {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url.includes("/face-scan")) {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
        }
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        next();
      });
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: "[name].[ext]",
        },
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
