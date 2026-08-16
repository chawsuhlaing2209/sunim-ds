import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';

/**
 * Every story renders with the tokens loaded and the a11y checks running.
 *
 * The a11y addon is set to fail rather than warn. A component contract says
 * roles, focus order and contrast are checks with a yes or no answer, and a
 * warning nobody reads is neither.
 */
const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: { test: 'error' },
    backgrounds: { disable: true },
  },

  globalTypes: {
    theme: {
      description: 'Which theme the tokens resolve to',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      // The same switch a consuming app has: one attribute on the root.
      document.documentElement.dataset.sunimTheme = String(
        context.globals.theme ?? 'light',
      );
      document.body.style.background = 'var(--sunim-surface-card)';
      document.body.style.color = 'var(--sunim-text-body)';
      document.body.style.fontFamily = 'var(--sunim-font-action)';
      return Story();
    },
  ],
};

export default preview;
