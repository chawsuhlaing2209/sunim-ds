import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Every test starts on an empty page. A component left mounted by the last
// test is the usual reason a passing suite goes red in a different order.
afterEach(() => {
  cleanup();
});
