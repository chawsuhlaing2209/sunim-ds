import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button.js';

/**
 * Stands in for the Icon Slot in the design file. Drawn with currentcolor so
 * it takes the label's colour on every variant. The library ships no icons of
 * its own, so this belongs to the stories rather than to the component.
 */
const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
    // Declared, not inferred. Storybook drops a URL arg it does not know
    // about, and `disabled` is inherited from the HTML button props, so
    // docgen never declares it. Without this line a screenshot of the
    // disabled case is a screenshot of the default one, which is the kind of
    // green tick that means nothing.
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    // A node cannot travel in a URL, and the screenshots are driven by URL
    // args. Mapping a boolean onto a real icon keeps this case drivable the
    // same way every other case is, instead of needing its own machinery.
    trailingIcon: {
      control: 'boolean',
      mapping: { true: <ArrowRight />, false: undefined },
    },
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

/* Trailing icon.

   The design shows this as two properties, Show trailing and Icon, and
   defaults the switch to on so the slot is visible while designing. Here the
   absence of an icon is the off position, so there is one prop and the
   default is no icon.

   The icon is decoration: the label already names the button, so it is hidden
   from screen readers. */

export const PrimaryTrailingIcon: Story = {
  args: { variant: 'primary', size: 'md', trailingIcon: <ArrowRight /> },
};

export const SecondaryTrailingIcon: Story = {
  args: { variant: 'secondary', size: 'md', trailingIcon: <ArrowRight /> },
};

export const GhostTrailingIcon: Story = {
  args: { variant: 'ghost', size: 'md', trailingIcon: <ArrowRight /> },
};

export const TrailingIconLarge: Story = {
  args: { variant: 'primary', size: 'lg', trailingIcon: <ArrowRight /> },
};
