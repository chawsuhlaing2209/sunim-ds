import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

/**
 * The docs site.
 *
 * A live example imports the component from `sunim-ds`, and that name is
 * aliased to the library source rather than to a built package. Two reasons:
 * a page renders the code as it is right now instead of as it was at the last
 * build, and the docs never have to wait on `npm run build` to be correct.
 */
export default defineConfig({
  // GitHub Pages serves this repo from a subpath, not from the root of the
  // domain. Starlight builds every internal link from these two, so getting
  // them wrong shows up as a site where nothing but the first page loads.
  site: 'https://chawsuhlaing2209.github.io',
  base: '/sunim-ds',
  integrations: [
    react(),
    starlight({
      title: 'Sunim DS',
      description: 'A demo design system, one component at a time.',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/chawsuhlaing2209/sunim-ds',
        },
      ],
      sidebar: [
        { label: 'Start here', items: [{ label: 'Overview', slug: 'index' }] },
        {
          // Every page written into content/docs/components appears here, so
          // a component's page is listed the moment it exists and nobody has
          // to remember to add it.
          label: 'Components',
          items: [{ autogenerate: { directory: 'components' } }],
        },
      ],
      customCss: ['./src/styles/tokens.css'],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        'sunim-ds': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      },
    },
  },
});
