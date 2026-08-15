# CLAUDE.md — Sunim DS (how a component is built here)

Read this before you write anything. It is the pattern, in full, because there
is no example component to copy yet. Follow it exactly and the checks pass.

## What this repo is

A React component library, published to npm as `sunim-ds`, documented with
Astro Starlight, visually tested with Chromatic. Components are built here one
at a time, each from a design source, by a person or by an agent.

Nothing in here tracks status. The board that does lives somewhere else, and
it works out where a component is from what actually exists: a commit that
resolves, a staging link that answers, test rows, a production URL, a docs
page. So the only thing that moves a component forward is the work itself.

## One component, six files

For a component called Button:

```
src/components/Button/
  Button.tsx               the component
  Button.css               its styles
  Button.stories.tsx       every variant, size and state
  Button.test.tsx          behaviour and accessibility
  button.contract.jsonc    the machine readable contract
  index.ts                 what this folder exports
```

And one line added to `src/index.ts`. A component not exported there does not
ship, whatever else works.

The folder is the component name in PascalCase. The contract file is the same
name in kebab case. Both matter: the checks look for them.

## The rules that are checked

Run `npm run check:tokens` and `npm run check:contracts` before you commit.
Both run in CI. Neither has an opinion, they just answer yes or no.

**Every value resolves to a token.** No hex anywhere except `tokens.css`. No
raw px, rem or em in a component stylesheet except `0` and a `1px` hairline.
Space, radius, type size, colour, shadow and duration all come from
`src/tokens/tokens.css`, and `src/tokens/tokens.ts` has the same names as a
type. If a design needs a value no token covers, say so in your report. Do not
invent a token and do not paste the value in.

```css
/* yes */
.sunim-button {
  padding: var(--sunim-space-2) var(--sunim-space-4);
  border-radius: var(--sunim-radius-md);
  background: var(--sunim-accent);
  color: var(--sunim-text-on-accent);
}

/* no */
.sunim-button {
  padding: 8px 16px;
  background: #2f5bd8;
}
```

**Props are discriminated unions.** No bare `string` where a fixed set is
meant. The point is that a wrong variant is a compile error, not a component
that renders with no styling.

```ts
// yes
export interface ButtonProps extends Omit<
  ComponentPropsWithoutRef<'button'>,
  'className'
> {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
}

// no
export interface ButtonProps {
  variant?: string;
}
```

**The contract validates.** `button.contract.jsonc` holds every field in
`contract.schema.json`. `storybookId` is the id of the first story, which is
the story title lowercased with a slash turned into a dash, then `--` and the
story name: a story file titled `UI/Button` with a `Primary` story gives
`ui-button--primary`. `astroDocsUrl` is where the page will be, whether or not
it is written yet.

Variants times sizes times states is how many test cases QA owes for this
component. Do not list a state you did not build a story for.

## Writing the component

- Class names are prefixed `sunim-`, so nothing collides in a consuming app.
- The component takes a `className` through if it makes sense, and never
  invents one that a consumer cannot override.
- Import the stylesheet from the component file: `import './Button.css'`. The
  build collects every one of them into `dist/index.css`.
- Forward the ref. A component nobody can get a ref to cannot be used inside a
  tooltip, a menu, or a form library.
- Accessibility is part of building it, not a pass afterwards. Roles, labels,
  keyboard order, focus visible, contrast at AA. The a11y addon is set to fail
  a story rather than warn about it.

## Writing the stories

Title the file `UI/<Name>`. Write one story per variant, one per size and one
per state, named after the thing they show. The states in the contract and the
stories in the file are the same list, in the same words.

The stories are what Chromatic screenshots and what QA tests against. A state
with no story is a state nobody ever looked at.

## Writing the tests

Vitest with Testing Library, jsdom. Test what the component does, not how it
is built: it renders its children, the click handler fires, the disabled one
does not fire, the accessible name is right, focus goes where it should. Do
not assert on class names.

## Commands

```bash
npm ci                    # install, this repo and the docs site together
npm test                  # vitest
npm run typecheck
npm run lint
npm run check:tokens      # no raw values in a component
npm run check:contracts   # every contract validates
npm run storybook         # look at it, on http://localhost:6006
npm run build-storybook   # the static build, what gets published
npx chromatic             # visual test, needs CHROMATIC_TOKEN
npm run build             # the publishable package, into dist
npm run docs:dev          # the docs site
```

`npm run storybook` and looking at the component is not optional. A build that
succeeds is not the same as a component that is right.

## Branches

- `main` is what ships. Never push to it.
- `staging` is what QA tests. Never push to it.
- `component/<name>` is yours. Push that, and only that.

A component branch ships nothing, which is why pushing it is safe and why it
is required: a commit becomes evidence only once somebody can fetch it, and an
unpushed commit can never be fetched.

## The docs page

Written after the component ships, into
`docs/src/content/docs/components/<name>.mdx`. Every one of these has to be a
heading on the page: Overview, When to use, when not, Live example, Props /
API, Variants and states, Accessibility, Tokens used, Changelog.

The live example imports the real component and renders it. It is not a
screenshot and not a code block pretending to be one.

Somebody checks every section is present. Nobody checks the writing but a
person, at the end, who will read it properly.

## Never

- Add a colour, a size or a spacing value that is not a token.
- Ship a component without a contract file.
- Push to `main` or `staging`, or open a pull request into them on your own.
- Change another component while you are building yours.
- Edit `src/tokens/tokens.css` to make one component work. Tokens are for the
  whole system, and a token added for one component is a value in disguise.
