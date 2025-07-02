import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  worker: {
    format: 'es',
  },
  server: {
    host: '::',
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[name].[ext]',
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    {
      name: 'cross-origin-isolation-plugin',
      configureServer: (server: any) => {
        server.middlewares.use((req: any, res: any, next: any) => {
          try {
            const isFaceScanPage = req.url.startsWith('/face-scan');
            const referrer = req.headers.referer;
            const isFromFaceScan = referrer && new URL(referrer).pathname.startsWith('/face-scan');

            // Apply cross-origin isolation ONLY for face-scan pages or assets loaded by them.
            if (isFaceScanPage || isFromFaceScan) {
              const userAgent = req.headers['user-agent'] || '';
              const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);

              if (isMobile) {
                res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
              } else {
                res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
              }

              res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
              res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
            } else {
              // Do not send any COEP/COOP headers — this allows other services to work
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
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
