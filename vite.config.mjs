import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'fs';

// Read package.json dependencies
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const dependencies = Object.keys(packageJson.dependencies || {});

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src/library', 'src/index.tsx', 'src/types'],
            exclude: ['_old', 'node_modules', 'dist', 'src/demo', 'src/demo.tsx'],
        }),
        libInjectCss(),
        tailwindcss(),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.tsx'),
            name: 'AppmintForm',
            fileName: (format) => `appmint-form.${format}.js`,
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                ...dependencies,
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                },
            },
        },
        sourcemap: true,
        emptyOutDir: true,
    },
});
