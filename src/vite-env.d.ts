/// <reference types="vite/client" />

interface ImportShim {
  (id: string): Promise<any>;
}

declare const importShim: ImportShim;
