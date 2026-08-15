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
  'surface',
  'surface-raised',
  'surface-sunken',
  'border',
  'border-strong',

  'text-heading',
  'text-body',
  'text-muted',
  'text-on-accent',

  'accent',
  'accent-hover',
  'accent-pressed',
  'accent-subtle',

  'danger',
  'danger-hover',
  'success',

  'disabled-surface',
  'disabled-text',

  'focus-ring',
  'focus-ring-width',
  'focus-ring-offset',

  'space-1',
  'space-2',
  'space-3',
  'space-4',
  'space-5',
  'space-6',
  'space-7',

  'radius-sm',
  'radius-md',
  'radius-lg',
  'radius-full',

  'font-sans',
  'font-mono',
  'font-size-sm',
  'font-size-md',
  'font-size-lg',
  'font-size-xl',
  'font-weight-regular',
  'font-weight-medium',
  'font-weight-bold',
  'line-height-tight',
  'line-height-body',

  'border-width',
  'duration-fast',
  'duration-medium',
  'easing',

  'shadow-sm',
  'shadow-md',
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
