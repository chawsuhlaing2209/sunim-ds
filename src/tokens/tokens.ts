/**
 * The token names, in TypeScript.
 *
 * tokens.css defines the values. This is the same list as a type, so a
 * component that reaches for a token nobody defined fails to compile rather
 * than rendering with a blank custom property and looking almost right.
 *
 * Keep the two in step. `npm run check:tokens` compares them and fails when
 * one has a name the other does not.
 */
export const TOKENS = [
  'accent-ink',
  'accent-ink-deep',
  'accent-soft',
  'surface-card',
  'line-color',
  'text-on-accent',

  'text-heading',
  'text-body',
  'text-muted',

  'disabled-surface',
  'disabled-text',

  'focus-ring-color',
  'focus-ring-width',
  'focus-ring',
  'shadow-button',

  'space-1',
  'space-2',
  'space-3',
  'space-4',
  'space-5',
  'space-6',
  'space-7',

  'control-height-md',
  'control-height-lg',

  'radius-sm',
  'radius-md',
  'radius-pill',

  'font-action',
  'text-sm',
  'text-lead',
  'font-weight-bold',
  'line-height-action',
  'letter-spacing-action',

  'border-width',
  'duration-fast',
  'duration-medium',
  'easing',
] as const;

export type TokenName = (typeof TOKENS)[number];

/** The custom property for a token, for the rare inline style that needs one. */
export function token(name: TokenName): string {
  return `var(--sunim-${name})`;
}

/** The custom property name itself, without the var() wrapper. */
export function tokenProperty(name: TokenName): `--sunim-${TokenName}` {
  return `--sunim-${name}`;
}
