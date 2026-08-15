/**
 * The public surface of the library. Anything not exported here is private,
 * whatever else it looks like from inside the repo.
 *
 * A component is added in one line, next to the others, and in nothing else.
 * If a component is not here it does not ship, so this file is the last step
 * of building one and not an afterthought.
 */

// Components
// export { Button } from './components/Button/index.js';
// export type { ButtonProps } from './components/Button/index.js';

// Tokens
export { TOKENS, token, tokenProperty } from './tokens/tokens.js';
export type { TokenName } from './tokens/tokens.js';
