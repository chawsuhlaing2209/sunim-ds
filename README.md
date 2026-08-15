# Sunim DS

A demo React design system. Components are built into it one at a time, from a design file, by the [Sunim Crew](https://github.com/chawsuhlaing2209/sunim-crew).

It is a real library rather than a sketch: strict TypeScript, ESM, tokens, Storybook, Chromatic, unit tests, an Astro Starlight docs site, and a build that produces a publishable package. What it does not have yet is components. The first one built here is the point of the exercise.

## Installing

```bash
npm install sunim-ds
```

```ts
import 'sunim-ds/tokens.css';
import 'sunim-ds/styles.css';
```

Tokens are a separate stylesheet so you can override them without touching component styles. React 18 or 19, as a peer dependency.

## Working on it

```bash
npm ci
npm run storybook
```

`npm ci` installs the library and the docs site together, as one workspace.

| Command                   | What it does                                         |
| ------------------------- | ---------------------------------------------------- |
| `npm test`                | Unit tests, vitest and Testing Library               |
| `npm run typecheck`       | Strict, with `noUncheckedIndexedAccess` on           |
| `npm run lint`            | eslint, type aware                                   |
| `npm run check:tokens`    | Fails on a raw colour or length in a component       |
| `npm run check:contracts` | Fails on a missing or invalid component contract     |
| `npm run build-storybook` | The static Storybook, which is also the staging site |
| `npx chromatic`           | Visual tests, needs `CHROMATIC_TOKEN`                |
| `npm run build`           | The publishable package, into `dist`                 |
| `npm run docs:dev`        | The docs site, locally                               |

## How a component is defined as done

Every check has a yes or no answer. No check needs an opinion, apart from the last one, which is a person reading the writing.

| Check                                 | How                                              |
| ------------------------------------- | ------------------------------------------------ |
| Story renders                         | The built Storybook is fetched                   |
| A screenshot exists per state         | The attachment files are there                   |
| Contract file validates               | `npm run check:contracts`                        |
| Every value resolves to a token       | `npm run check:tokens`                           |
| Props are discriminated unions        | `npm run typecheck`                              |
| Accessibility passes                  | The a11y addon fails a story rather than warning |
| Commit resolves                       | The commit URL is fetched                        |
| Docs page answers, with every section | The page is fetched and its headings parsed      |

`CLAUDE.md` is the full pattern: the six files a component is made of, the token rule, the props rule, the story titles, the branches. Read it before building anything here, whether you are a person or an agent.

## Tokens

Semantic, never literal. A component asks for `--sunim-accent`, never for a blue. `src/tokens/tokens.css` holds the values and is the only file in the library allowed to hold one. `src/tokens/tokens.ts` holds the same names as a TypeScript type, so a token nobody defined fails to compile.

Light and dark both ship. The library follows the reader's own setting, and `data-sunim-theme="dark"` on the root element overrides it.

## Layout

```
src/
  components/           one folder per component
  tokens/               tokens.css and tokens.ts
  index.ts              the public surface
scripts/                the contract and token checks
.storybook/             Storybook config, a11y on
docs/                   the Astro Starlight site
contract.schema.json    generated from scripts/contract.mjs
```

## Where it is hosted

One GitHub Pages site, three paths, rebuilt from both branches on every push.

| URL                                                                                   | What                                                            |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [chawsuhlaing2209.github.io/sunim-ds](https://chawsuhlaing2209.github.io/sunim-ds/)   | The docs, built from `main`                                     |
| [/storybook/](https://chawsuhlaing2209.github.io/sunim-ds/storybook/)                 | Storybook, built from `main`                                    |
| [/staging/storybook/](https://chawsuhlaing2209.github.io/sunim-ds/staging/storybook/) | Storybook, built from `staging`, which is what QA tests against |

Pages replaces the whole site on every deploy, so the workflow builds both branches every time. One that built only the branch that triggered it would take the other paths down.

The Storybook build uses relative asset paths, which is what lets one build serve from `/storybook/`, from `/staging/storybook/`, and from a folder on your own machine.

## Publishing

`npm run build` produces `dist`, and `files` limits the package to it. Publishing is deliberately not automated here: the crew does it, once a named person has approved, and nothing else holds the token.

## Licence

MIT. See `LICENSE`.
