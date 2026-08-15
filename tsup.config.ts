import { defineConfig } from 'tsup';

/**
 * One entry, ESM only, with types.
 *
 * Per component CSS is imported by the component itself, so everything lands
 * in dist/index.css and a consumer takes one stylesheet. The tokens are kept
 * separate and copied by the build script, so they can be loaded first and
 * overridden without touching component styles.
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  // Types come from tsc, not from tsup: the same compiler that typechecks
  // the repo, with the same settings, so the published types and the source
  // cannot disagree.
  dts: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: 'es2022',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
