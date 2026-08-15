import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    // The repo starts with no components, so no tests. A component that
    // ships without one is caught by check:contracts, not by an empty run.
    passWithNoTests: true,
    css: true,
  },
});
