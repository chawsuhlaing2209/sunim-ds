import { z } from 'zod';

/**
 * The component contract, field for field the same shape the crew's manager
 * validates against. It is repeated here on purpose: this repo has to be able
 * to reject a bad contract on its own, without the crew installed, so that a
 * person building a component by hand gets the same answer an agent gets.
 *
 * If the crew's docs/component-contract.md changes, change this with it.
 */
const nonEmpty = z.string().min(1, 'must not be empty');
const list = z.array(nonEmpty).min(1, 'must list at least one');

export const contractSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z][a-z0-9-]*$/, 'must be kebab case, like button-group'),
  name: nonEmpty,
  props: z.record(z.string(), z.unknown()),
  variants: list,
  sizes: list,
  states: list,
  tokens: list,
  a11y: z.object({
    role: nonEmpty,
    focusOrder: nonEmpty,
    contrast: nonEmpty,
  }),
  usage: z.object({
    whenToUse: nonEmpty,
    whenNot: nonEmpty,
  }),
  storybookId: nonEmpty,
  astroDocsUrl: z
    .string()
    .regex(/^https?:\/\/\S+$/, 'must be an http or https url'),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+/, 'must be a semver version, like 1.0.0'),
});

/**
 * The contract file is jsonc, so it may carry comments and a trailing comma.
 * Strings are stepped over, so a // inside a URL survives.
 */
export function parseJsonc(text) {
  let out = '';
  let index = 0;

  while (index < text.length) {
    const char = text[index] ?? '';
    const next = text[index + 1] ?? '';

    if (char === '"') {
      out += char;
      index += 1;
      while (index < text.length) {
        const inner = text[index] ?? '';
        out += inner;
        index += 1;
        if (inner === '\\') {
          out += text[index] ?? '';
          index += 1;
          continue;
        }
        if (inner === '"') break;
      }
      continue;
    }

    if (char === '/' && next === '/') {
      while (index < text.length && text[index] !== '\n') index += 1;
      continue;
    }

    if (char === '/' && next === '*') {
      index += 2;
      while (
        index < text.length &&
        !(text[index] === '*' && text[index + 1] === '/')
      ) {
        index += 1;
      }
      index += 2;
      continue;
    }

    out += char;
    index += 1;
  }

  return JSON.parse(out.replace(/,(\s*[}\]])/g, '$1'));
}

/** How many test rows QA owes for a component: every state of every size of every variant. */
export function expectedCases(contract) {
  return (
    contract.variants.length * contract.sizes.length * contract.states.length
  );
}
