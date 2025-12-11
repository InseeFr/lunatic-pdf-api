import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: ['./src/tests/setupTests.ts'],
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        exclude: ['node_modules', 'dist'],
        css: true,
        coverage: {
          reporter: ['text', 'lcov'],
        },
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    }
})
