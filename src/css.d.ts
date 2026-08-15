/**
 * A component imports its own stylesheet, and the build collects every one of
 * them into dist/index.css. TypeScript needs telling that a .css import is a
 * side effect and not a module with an export.
 */
declare module '*.css';
