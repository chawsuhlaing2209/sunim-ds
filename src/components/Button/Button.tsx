import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> {
  /** What the button says. A button with no label has nothing to announce. */
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Waiting on something. The button stays in the tab order and keeps its
   * width, so a page does not jump, and it stops taking clicks. Announced
   * with aria-busy rather than by swapping the label, so a screen reader
   * keeps the name it already read out.
   */
  loading?: boolean;
}

/**
 * The Button, built from the Figma node in the Airtable row.
 *
 * Three variants, two sizes, five states. Hover and focus belong to CSS, so
 * they are not props: a state the browser owns is not a state to re-implement
 * in JavaScript. Disabled and loading are props, because only the caller
 * knows them.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    const classes = [
      'sunim-button',
      `sunim-button--${variant}`,
      `sunim-button--${size}`,
      loading ? 'sunim-button--loading' : '',
      className ?? '',
    ]
      .filter((part) => part !== '')
      .join(' ');

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        className={classes}
        // A loading button is not disabled: a disabled control leaves the tab
        // order, and something a person was about to press should not vanish
        // from under their keyboard.
        disabled={disabled}
        aria-busy={loading || undefined}
        aria-disabled={loading ? true : undefined}
        onClick={loading ? undefined : rest.onClick}
      >
        {loading ? (
          <span className="sunim-button__spinner" aria-hidden="true" />
        ) : null}
        <span className="sunim-button__label">{children}</span>
      </button>
    );
  },
);
