import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { contractSchema, expectedCases, parseJsonc } from './contract.mjs';

const COMPONENTS = fileURLToPath(new URL('../src/components', import.meta.url));

/**
 * Every component ships a contract, and every contract validates.
 *
 * The crew's manager checks this too, from outside, after the fact. This runs
 * here so a person or an agent finds out while they are still in the file,
 * rather than three stages later when the sweep refuses the commit.
 */
async function contractFiles() {
  const found = [];

  let entries;
  try {
    entries = await readdir(COMPONENTS, { withFileTypes: true });
  } catch {
    return found;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dir = join(COMPONENTS, entry.name);
    const files = await readdir(dir);
    const contract = files.find((file) => file.endsWith('.contract.jsonc'));
    found.push({ component: entry.name, dir, file: contract });
  }

  return found;
}

async function main() {
  const components = await contractFiles();

  if (components.length === 0) {
    console.log(
      'No components yet, so no contracts to check. The first one built here gets checked from that moment on.',
    );
    return 0;
  }

  const problems = [];

  for (const entry of components) {
    if (entry.file === undefined) {
      problems.push(
        `${entry.component}: no contract file. Every component ships one, named <name>.contract.jsonc, beside the component.`,
      );
      continue;
    }

    const path = join(entry.dir, entry.file);
    let parsed;
    try {
      parsed = parseJsonc(await readFile(path, 'utf8'));
    } catch (error) {
      problems.push(`${entry.component}: contract is not valid JSON. ${error}`);
      continue;
    }

    const result = contractSchema.safeParse(parsed);
    if (!result.success) {
      for (const issue of result.error.issues) {
        problems.push(
          `${entry.component}: ${issue.path.join('.') || '(root)'} ${issue.message}`,
        );
      }
      continue;
    }

    const contract = result.data;
    const count = (list, one, many) =>
      `${list.length} ${list.length === 1 ? one : many}`;

    console.log(
      `${contract.name}: contract valid, version ${contract.version}, ${count(contract.variants, 'variant', 'variants')}, ${count(contract.sizes, 'size', 'sizes')}, ${count(contract.states, 'state', 'states')}, ${expectedCases(contract)} cases to test`,
    );
  }

  if (problems.length > 0) {
    console.error('');
    for (const problem of problems) console.error(`  ${problem}`);
    console.error('');
    console.error(
      `${problems.length} problem${problems.length === 1 ? '' : 's'}. A component whose contract does not validate is not finished, whatever else works.`,
    );
    return 1;
  }

  return 0;
}

main().then(
  (code) => process.exit(code),
  (error) => {
    console.error(error);
    process.exit(1);
  },
);
