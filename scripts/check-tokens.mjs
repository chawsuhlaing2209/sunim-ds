import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('../src', import.meta.url));
const TOKENS_CSS = join(SRC, 'tokens', 'tokens.css');
const TOKENS_TS = join(SRC, 'tokens', 'tokens.ts');

/**
 * Every value in a component resolves to a token.
 *
 * docs/component-contract.md makes this a check with a yes or no answer, so
 * it is one here. A raw hex in a component is a value that cannot be
 * rethemed, and it will look right in exactly the theme the person who wrote
 * it had open at the time.
 */
const HEX = /#[0-9a-fA-F]{3,8}\b/g;

/** A length that is not 0 and not a hairline border. */
const RAW_LENGTH = /(?<![\w-])(?!0)(?!1px)\d*\.?\d+(px|rem|em)\b/g;

const ALLOWED_IN = new Set([TOKENS_CSS, TOKENS_TS]);

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await files(full)));
    } else if (['.ts', '.tsx', '.css'].includes(extname(entry.name))) {
      found.push(full);
    }
  }
  return found;
}

/** The token names each side knows about, so the two cannot drift apart. */
async function tokenNames() {
  const css = await readFile(TOKENS_CSS, 'utf8');
  const ts = await readFile(TOKENS_TS, 'utf8');

  const defined = new Set(
    [...css.matchAll(/--sunim-([a-z0-9-]+)\s*:/g)].map((hit) => hit[1]),
  );
  const declared = new Set(
    [...ts.matchAll(/^\s*'([a-z0-9-]+)',$/gm)].map((hit) => hit[1]),
  );

  return { defined, declared };
}

async function main() {
  const problems = [];
  const { defined, declared } = await tokenNames();

  for (const name of defined) {
    if (!declared.has(name)) {
      problems.push(
        `tokens.css defines --sunim-${name}, and tokens.ts does not list it. A token TypeScript cannot name is a token a component cannot use safely.`,
      );
    }
  }
  for (const name of declared) {
    if (!defined.has(name)) {
      problems.push(
        `tokens.ts lists ${name}, and tokens.css defines no value for it. A component asking for it gets an empty custom property and renders almost right.`,
      );
    }
  }

  // Every token a component reaches for has to exist.
  for (const file of await files(SRC)) {
    if (ALLOWED_IN.has(file)) continue;
    const text = await readFile(file, 'utf8');
    const where = file.slice(SRC.length + 1);

    for (const hit of text.matchAll(/var\(\s*--sunim-([a-z0-9-]+)/g)) {
      if (!defined.has(hit[1])) {
        problems.push(`${where}: uses --sunim-${hit[1]}, which is not a token`);
      }
    }

    if (file.endsWith('.test.ts') || file.endsWith('.test.tsx')) continue;

    for (const hit of text.matchAll(HEX)) {
      problems.push(
        `${where}: raw colour ${hit[0]}. Use a token from tokens.css.`,
      );
    }

    if (extname(file) === '.css') {
      for (const hit of text.matchAll(RAW_LENGTH)) {
        problems.push(
          `${where}: raw length ${hit[0]}. Use a space, radius or type token.`,
        );
      }
    }
  }

  if (problems.length > 0) {
    console.error('');
    for (const problem of problems) console.error(`  ${problem}`);
    console.error('');
    console.error(
      `${problems.length} problem${problems.length === 1 ? '' : 's'}. Every value in a component resolves to a token, and tokens.css is the only file allowed to hold one.`,
    );
    return 1;
  }

  console.log(
    `${defined.size} tokens, defined in tokens.css and named in tokens.ts, and nothing outside them holds a raw value.`,
  );
  return 0;
}

main().then(
  (code) => process.exit(code),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
