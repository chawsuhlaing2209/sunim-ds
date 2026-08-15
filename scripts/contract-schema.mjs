import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { contractSchema } from './contract.mjs';

/**
 * Write contract.schema.json from the zod schema, so the checked in JSON
 * Schema and the check that runs in CI can never disagree. One definition,
 * two readers: the script validates, editors and agents read the JSON.
 */
const path = fileURLToPath(new URL('../contract.schema.json', import.meta.url));

const schema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://github.com/chawsuhlaing2209/sunim-ds/contract.schema.json',
  title: 'Sunim DS component contract',
  description:
    'Ships beside every component. Read by the person building it, by the agent building it, and by the crew that checks it.',
  ...z.toJSONSchema(contractSchema),
};

await writeFile(path, `${JSON.stringify(schema, null, 2)}\n`, 'utf8');
console.log(`Wrote ${path}`);
