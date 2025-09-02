import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react(),
    ],
    publicDir: 'public',
    // Use the demo.tsx as the entry point
    build: {
        outDir: 'demo-dist',
        sourcemap: true,
    },
    // Configure the dev server
    server: {
        port: 3500,
        open: true,
    },
});
