<!--
  Base branch: staging.

  A component branch goes into staging, and staging goes into main. A pull
  request into main from anything but staging is refused by the branch rule
  check, because main is what ships and staging is where it gets tested.
-->

## What this is

## How it was checked

- [ ] `npm run check:tokens`
- [ ] `npm run check:contracts`
- [ ] `npm test`
- [ ] Looked at it in Storybook, against the design
