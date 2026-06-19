// @context: Test setup — global test configuration
// @purpose: Imports jest-dom matchers (toBeInTheDocument, toHaveClass, etc.) for all tests
// @behavior: Runs before every test file; adds DOM-specific matchers to vitest's expect
// @dependencies: @testing-library/jest-dom, vitest

import '@testing-library/jest-dom';
