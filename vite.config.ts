/**
 * @file This Vite configuration is specifically tailored for a unique project structure where the
 * application is built as a self-contained "micro-app".
 *
 * Key Configurations:
 *
 * 1.  **Micro-App Build Destination (`build.outDir`):**
 *     The output is directed to 'public/face-scan'. This indicates the project is not a
 *     standalone application but a component to be placed within the `public` directory of a
 *     parent application.
 *
 * 2.  **Conditional Cross-Origin Isolation (custom plugin):**
 *     A custom middleware plugin, `cross-origin-isolation-plugin`, is used to handle the
 *     strict security requirements of features like WebAssembly (used by the Shen.AI SDK).
 *     - For requests to `/face-scan`, it applies the necessary cross-origin isolation headers
 *       (`Cross-Origin-Embedder-Policy`, `Cross-Origin-Opener-Policy`).
 *     - For all other requests, it ensures these headers are removed, preventing conflicts
 *       with other parts of the parent application that may not be compatible with these
 *       strict security policies.
 */
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
      // "Cross-Origin-Opener-Policy": "same-origin",
      // "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  build: {
    outDir: 'public/face-scan',
    rollupOptions: {
      output: {
        assetFileNames: '[name].[ext]',
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "cross-origin-isolation-plugin",
      configureServer: (server: any) => {
        server.middlewares.use((req: any, res: any, next: any) => {
          try {
            // Apply cross-origin isolation ONLY for face-scan pages
            if (req.url.startsWith('/face-scan')) {
              res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
              res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
              res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
            } else {
              // Do not send any COEP/COOP headers — this allows YouTube embeds
              res.removeHeader?.('Cross-Origin-Embedder-Policy');
              res.removeHeader?.('Cross-Origin-Opener-Policy');
              res.removeHeader?.('Cross-Origin-Resource-Policy');
            }

            next();
          } catch (error) {
            next(error);
          }
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
