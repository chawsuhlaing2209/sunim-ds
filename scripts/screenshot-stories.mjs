import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { contractSchema, expectedCases, parseJsonc } from './contract.mjs';

/**
 * One screenshot per case, where a case is one variant, one size, one state.
 *
 * QA owes a picture of every combination the contract lists, and a test row
 * with no picture on it does not count. Writing thirty stories by hand to get
 * thirty pictures would mean the matrix lived in two places and drifted; this
 * drives the component through Storybook's args instead, so the contract
 * stays the only list of what exists.
 *
 * Hover and focus are put on by the browser, not faked with a class. A class
 * that looks like hover is exactly the kind of thing that passes a review and
 * fails for a person with a keyboard.
 */
const COMPONENTS = fileURLToPath(new URL('../src/components', import.meta.url));

function usage() {
  console.log(
    [
      'npm run screenshots -- --url <storybook> --out <dir> [--component Button]',
      '',
      '  --url        where the built Storybook is served, for example',
      '               http://localhost:6006 or the staging link',
      '  --out        where the PNGs go. Created if it is not there.',
      '  --component  one component folder. Every one of them by default.',
    ].join('\n'),
  );
}

function args(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, '');
    if (key !== undefined) out[key] = argv[i + 1];
  }
  return out;
}

/** button.contract.jsonc for every component, or the one asked for. */
async function contracts(only) {
  const found = [];
  for (const entry of await readdir(COMPONENTS, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (only !== undefined && entry.name !== only) continue;

    const dir = join(COMPONENTS, entry.name);
    const file = (await readdir(dir)).find((name) =>
      name.endsWith('.contract.jsonc'),
    );
    if (file === undefined) continue;

    const parsed = contractSchema.safeParse(
      parseJsonc(await readFile(join(dir, file), 'utf8')),
    );
    if (!parsed.success) {
      throw new Error(`${entry.name}: contract does not validate`);
    }
    found.push(parsed.data);
  }
  return found;
}

/** The story to render, and the args that put it in this case. */
function storyUrl(base, contract, variant, size, state) {
  const storyArgs = [`variant:${variant}`, `size:${size}`];
  if (state === 'disabled') storyArgs.push('disabled:!true');
  if (state === 'loading') storyArgs.push('loading:!true');

  // The first story of the component, which is what storybookId names.
  const id = contract.storybookId;
  return `${base.replace(/\/$/, '')}/iframe.html?id=${id}&viewMode=story&args=${storyArgs.join(';')}`;
}

/**
 * Put the browser into the state, for real. focus-visible only comes on for a
 * keyboard, so focus is reached by tabbing rather than by calling focus().
 */
async function enter(page, selector, state) {
  const button = page.locator(selector).first();

  if (state === 'hover') await button.hover();
  if (state === 'focus') {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(120);
  return button;
}

async function main() {
  const options = args(process.argv.slice(2));
  if (options.url === undefined || options.out === undefined) {
    usage();
    return 1;
  }

  const found = await contracts(options.component);
  if (found.length === 0) {
    console.error('No component contract to work from.');
    return 1;
  }

  await mkdir(options.out, { recursive: true });
  const browser = await chromium.launch();
  const cases = [];

  try {
    const page = await browser.newPage({
      viewport: { width: 640, height: 320 },
      deviceScaleFactor: 2,
    });

    for (const contract of found) {
      console.log(
        `${contract.name}: ${expectedCases(contract)} cases to photograph`,
      );

      for (const variant of contract.variants) {
        for (const size of contract.sizes) {
          for (const state of contract.states) {
            const url = storyUrl(options.url, contract, variant, size, state);
            // Not networkidle: a Storybook dev server holds a live reload
            // socket open and never goes idle, so waiting for that waits for
            // ever. Waiting for the component itself is the real condition.
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            // The component's own class, not "button": Storybook renders its
            // own controls inside the canvas, and the first button on the
            // page is one of those rather than the thing being photographed.
            const selector = `.sunim-${contract.id}`;
            await page.waitForSelector(selector, {
              state: 'visible',
              timeout: 20000,
            });

            const target = await enter(page, selector, state);
            const file = `${contract.id}-${variant}-${size}-${state}.png`;
            await target.screenshot({
              path: join(options.out, file),
              // A little room, so the focus ring and the shadow are in shot
              // rather than clipped at the border box.
              scale: 'device',
            });

            cases.push({
              name: `${contract.name}, ${variant}, ${size}, ${state}`,
              variant,
              size,
              state,
              screenshot: file,
            });
          }
        }
      }
    }
  } finally {
    await browser.close();
  }

  // The shape QA reports in, with the result left out on purpose. Whether a
  // case passed is a judgement, and this script only takes the pictures.
  await writeFile(
    join(options.out, 'cases.json'),
    `${JSON.stringify({ cases }, null, 2)}\n`,
    'utf8',
  );

  console.log(
    `${cases.length} screenshots and cases.json in ${options.out}. Nothing here says whether a case passed: that is for whoever looks at them.`,
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
