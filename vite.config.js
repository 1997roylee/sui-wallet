import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react(), crx({ manifest })],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        // 👈 optimizedeps
        esbuildOptions: {
            target: 'esnext',
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
            supported: {
                bigint: true,
            },
        },
    },
    build: {
        target: ['esnext'], // 👈 build.target
    },
})
