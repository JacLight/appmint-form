import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    // Use the test-theme.tsx as the entry point
    build: {
        outDir: 'theme-test-dist',
        sourcemap: true,
        rollupOptions: {
            input: {
                main: 'theme-test.html',
            },
        },
    },
    // Configure the dev server
    server: {
        port: 3600,
        open: true,
    },
});
