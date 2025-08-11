import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./tests/vitest.setup.ts'],
    typecheck: {
      enabled: true,
      tsconfig: './tests/tsconfig.json'
    },
    coverage: {
      include: ['**/src/**/*.?(c|m)[jt]s?(x)']
    }
  },
  plugins: [tsconfigPaths()]
});
