import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button.js';

/**
 * One story per thing the design shows. The contract lists three variants,
 * two sizes and five states, and QA owes one test case per combination, so a
 * state with no story here is a state nobody ever looked at.
 *
 * Hover and focus belong to the browser, so their stories set the pseudo
 * state rather than faking it with a class.
 */
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: { children: 'Get started' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Primary */

export const Primary: Story = {
  args: { variant: 'primary', size: 'md' },
};

export const PrimaryHover: Story = {
  args: { variant: 'primary', size: 'md' },
  parameters: { pseudo: { hover: true } },
};

export const PrimaryFocus: Story = {
  args: { variant: 'primary', size: 'md' },
  parameters: { pseudo: { focusVisible: true } },
};

export const PrimaryDisabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true },
};

export const PrimaryLoading: Story = {
  args: { variant: 'primary', size: 'md', loading: true },
};

export const PrimaryLarge: Story = {
  args: { variant: 'primary', size: 'lg' },
};

/* Secondary */

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
};

export const SecondaryHover: Story = {
  args: { variant: 'secondary', size: 'md' },
  parameters: { pseudo: { hover: true } },
};

export const SecondaryFocus: Story = {
  args: { variant: 'secondary', size: 'md' },
  parameters: { pseudo: { focusVisible: true } },
};

export const SecondaryDisabled: Story = {
  args: { variant: 'secondary', size: 'md', disabled: true },
};

export const SecondaryLoading: Story = {
  args: { variant: 'secondary', size: 'md', loading: true },
};

export const SecondaryLarge: Story = {
  args: { variant: 'secondary', size: 'lg' },
};

/* Ghost */

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md' },
};

export const GhostHover: Story = {
  args: { variant: 'ghost', size: 'md' },
  parameters: { pseudo: { hover: true } },
};

export const GhostFocus: Story = {
  args: { variant: 'ghost', size: 'md' },
  parameters: { pseudo: { focusVisible: true } },
};

export const GhostDisabled: Story = {
  args: { variant: 'ghost', size: 'md', disabled: true },
};

export const GhostLoading: Story = {
  args: { variant: 'ghost', size: 'md', loading: true },
};

export const GhostLarge: Story = {
  args: { variant: 'ghost', size: 'lg' },
};

/**
 * Every variant and size at once, which is the view a person compares
 * against the Figma frame.
 */
export const EveryVariant: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {(['md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: '1rem' }}>
          {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
            <Button key={variant} variant={variant} size={size}>
              Get started
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
