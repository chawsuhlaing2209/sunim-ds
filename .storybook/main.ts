import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', 'storybook-addon-pseudo-states'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    // The props table is generated from the types, so the table and the
    // component cannot describe different things.
    reactDocgen: 'react-docgen-typescript',
  },

  // Relative asset paths, so one build works wherever it is served from:
  // /storybook/ for the published one, /staging/storybook/ for the one QA
  // tests against, and / when somebody opens the folder locally.
  viteFinal: (config) => ({ ...config, base: './' }),
};

export default config;
