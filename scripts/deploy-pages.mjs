import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Publish this branch's part of the Pages site, without GitHub Actions.
 *
 * .github/workflows/pages.yml does the same thing on every push and is the
 * better way round. It needs Actions, and Actions needs the account's billing
 * to be in good standing. This is the same deploy by hand, so the site can be
 * up while that is not true.
 *
 * The site has three parts and this only ever replaces the one belonging to
 * the branch you are on. Everything else on gh-pages is left exactly as it
 * was, which is why deploying staging cannot take the docs down.
 *
 *   main     ->  /            the docs
 *                /storybook/  what shipped
 *   staging  ->  /staging/storybook/   what QA tests against
 */
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const WORKTREE = join(ROOT, '.pages-worktree');
const BRANCH = 'gh-pages';

/**
 * Every directory this deploy owns, so the stamp sits beside the thing it
 * describes. A checker points at a URL, not at a branch, and the docs and the
 * Storybook are two different URLs.
 */
function stampDirs(branch) {
  return branch === 'main'
    ? [WORKTREE, join(WORKTREE, 'storybook')]
    : [join(WORKTREE, 'staging', 'storybook')];
}

function git(args, options = {}) {
  // execFileSync hands back null rather than a string when the output is not
  // being captured, so this cannot go straight to trim().
  const out = execFileSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
    ...options,
  });
  return typeof out === 'string' ? out.trim() : '';
}

function run(command) {
  console.log(`  ${command}`);
  execFileSync(command, { cwd: ROOT, shell: true, stdio: 'inherit' });
}

/** Replace the contents of a directory, leaving the directory itself alone. */
function replaceInto(source, target) {
  mkdirSync(target, { recursive: true });
  for (const entry of readdirSync(target)) {
    rmSync(join(target, entry), { recursive: true, force: true });
  }
  cpSync(source, target, { recursive: true });
}

function main() {
  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);

  if (branch !== 'main' && branch !== 'staging') {
    console.error(
      `On ${branch}. The site is built from main and from staging, and a component branch publishes nothing. That is deliberate: a branch that could publish could ship without anybody approving it.`,
    );
    return 1;
  }

  // A deploy of work nobody has committed is a site that matches no commit,
  // and therefore evidence that points at nothing.
  if (git(['status', '--porcelain']) !== '') {
    console.error(
      'The working tree has changes that are not committed. Commit them first, so the site that goes up is a commit somebody can go and read.',
    );
    return 1;
  }

  console.log(`Building ${branch}.`);
  run('npm run build');
  if (branch === 'main') run('npm run docs:build');
  run('npm run build-storybook');

  // A worktree, so the deploy never touches the branch you are working on.
  rmSync(WORKTREE, { recursive: true, force: true });
  git(['worktree', 'prune']);

  const exists = git(['ls-remote', '--heads', 'origin', BRANCH]) !== '';
  if (exists) {
    git(['fetch', '-q', 'origin', `+${BRANCH}:${BRANCH}`]);
    git(['worktree', 'add', '-q', WORKTREE, BRANCH]);
  } else {
    git(['worktree', 'add', '-q', '--orphan', '-b', BRANCH, WORKTREE]);
  }

  if (branch === 'main') {
    // Everything at the root except the staging subtree, which belongs to the
    // other branch and is none of this deploy's business.
    for (const entry of readdirSync(WORKTREE)) {
      if (entry === '.git' || entry === 'staging') continue;
      rmSync(join(WORKTREE, entry), { recursive: true, force: true });
    }
    cpSync(join(ROOT, 'docs', 'dist'), WORKTREE, { recursive: true });
    replaceInto(join(ROOT, 'storybook-static'), join(WORKTREE, 'storybook'));
  } else {
    replaceInto(
      join(ROOT, 'storybook-static'),
      join(WORKTREE, 'staging', 'storybook'),
    );
  }

  // Without this, GitHub runs the site through Jekyll, which drops every
  // directory starting with an underscore. Astro puts its assets in _astro,
  // so the site would come up with no styles and no scripts at all.
  writeFileSync(join(WORKTREE, '.nojekyll'), '', 'utf8');

  const sha = git(['rev-parse', '--short', 'HEAD']);

  // Say which build this is, next to the build.
  //
  // Without it a preview is unfalsifiable: it answers 200 whether it is
  // today's build or last week's, and the only way to tell is for somebody to
  // open it and count. That has already cost a cycle here. A pull request was
  // merged, the branch was correct, the link was live, and the site was
  // quietly serving the build from before the merge. A merge changes a
  // branch. It does not change a site.
  //
  // QA reads this before it tests anything and refuses to photograph a
  // preview that is older than the commit it is meant to be testing.
  const stamp = `${JSON.stringify(
    {
      commit: git(['rev-parse', 'HEAD']),
      shortCommit: sha,
      branch,
      builtAt: new Date().toISOString(),
    },
    null,
    2,
  )}\n`;

  for (const dir of stampDirs(branch)) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'build-info.json'), stamp, 'utf8');
  }
  git(['add', '-A'], { cwd: WORKTREE });

  const staged = git(['status', '--porcelain'], { cwd: WORKTREE });
  if (staged === '') {
    console.log('The site is already exactly this. Nothing to publish.');
  } else {
    git(['commit', '-q', '-m', `Publish ${branch} at ${sha}`], {
      cwd: WORKTREE,
    });
    git(['push', '-q', 'origin', BRANCH], { cwd: WORKTREE });
    console.log(`Published ${branch} at ${sha}.`);
  }

  git(['worktree', 'remove', '--force', WORKTREE]);

  const base = 'https://chawsuhlaing2209.github.io/sunim-ds';
  console.log('');
  console.log(
    branch === 'main'
      ? `  ${base}/\n  ${base}/storybook/`
      : `  ${base}/staging/storybook/`,
  );
  console.log('');
  console.log(
    'GitHub takes a minute or so to serve a new deploy, and longer the first time.',
  );

  return 0;
}

try {
  process.exit(main());
} catch (error) {
  if (existsSync(WORKTREE)) {
    try {
      git(['worktree', 'remove', '--force', WORKTREE]);
    } catch {
      // Leave it. Better a stray directory than losing the real error.
    }
  }
  console.error(error.message ?? error);
  process.exit(1);
}
