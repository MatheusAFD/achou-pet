import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './setup-tests.ts',
    globals: true,
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html']
    }
  }
})
