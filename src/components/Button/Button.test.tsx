import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button.js';

/**
 * What the component does, not how it is built. No assertions on class names:
 * those are ours to change, and a test that breaks when we rename a class is
 * a test that stops anybody tidying anything.
 */
describe('Button', () => {
  it('renders its label as the accessible name', () => {
    render(<Button>Get started</Button>);

    expect(
      screen.getByRole('button', { name: 'Get started' }),
    ).toBeInTheDocument();
  });

  it('calls the handler when pressed', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Get started</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is reachable and pressable from the keyboard', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Get started</Button>);

    await userEvent.tab();
    expect(screen.getByRole('button')).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Get started
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not fire while loading, and says it is busy', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Get started
      </Button>,
    );
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('keeps its name and its place in the tab order while loading', async () => {
    // A control that vanishes from the keyboard under somebody's fingers is
    // worse than one that is briefly unresponsive, and a screen reader should
    // not have the label change out from under it.
    render(<Button loading>Get started</Button>);

    await userEvent.tab();

    expect(screen.getByRole('button', { name: 'Get started' })).toHaveFocus();
  });

  it('defaults to type button, so it cannot submit a form by accident', () => {
    render(<Button>Get started</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('can still be a submit button when a form wants one', () => {
    render(<Button type="submit">Send</Button>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('forwards a ref, so it can live inside a tooltip or a form library', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Get started</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('takes a className through without losing its own', () => {
    render(<Button className="page-cta">Get started</Button>);

    expect(screen.getByRole('button')).toHaveClass('page-cta');
    expect(screen.getByRole('button')).toHaveClass('sunim-button');
  });

  it('renders every variant and size the contract lists', () => {
    for (const variant of ['primary', 'secondary', 'ghost'] as const) {
      for (const size of ['md', 'lg'] as const) {
        const { unmount } = render(
          <Button variant={variant} size={size}>
            {variant} {size}
          </Button>,
        );
        expect(
          screen.getByRole('button', { name: `${variant} ${size}` }),
        ).toBeInTheDocument();
        unmount();
      }
    }
  });
});
