# E2E Tests for FinanceFlow

This directory contains End-to-End (E2E) tests for the FinanceFlow application using [Playwright](https://playwright.dev/).

## Test Structure

- **home.spec.ts** - Tests for the home view including balance display, transactions, and budget sections
- **navigation.spec.ts** - Tests for navigation between different views
- **add-transaction.spec.ts** - Tests for adding transactions including amount input and category selection
- **stats.spec.ts** - Tests for the statistics/spending view
- **assets.spec.ts** - Tests for the assets management view

## Running Tests

### Prerequisites

Make sure you have installed dependencies:

```bash
npm install
```

### Run all tests (headless mode)

```bash
npm run test:e2e
```

### Run tests with UI mode (recommended for development)

```bash
npm run test:e2e:ui
```

This opens an interactive UI where you can:
- See all tests
- Run specific tests
- Watch tests run in real-time
- Time travel through test execution
- View detailed logs and traces

### Run tests in headed mode (see browser)

```bash
npm run test:e2e:headed
```

### View test report

After running tests, view the HTML report:

```bash
npm run test:e2e:report
```

## Writing New Tests

When adding new tests:

1. Create a new `.spec.ts` file in the `e2e` directory
2. Import test utilities: `import { test, expect } from '@playwright/test';`
3. Use `test.describe()` to group related tests
4. Use `test.beforeEach()` for common setup
5. Write descriptive test names that explain what is being tested

### Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something specific', async ({ page }) => {
    // Arrange
    // Act
    // Assert
    await expect(page.getByText('Expected Text')).toBeVisible();
  });
});
```

## Configuration

The Playwright configuration is in `playwright.config.ts` at the project root. It includes:

- Test timeout: 30 seconds
- Base URL: http://localhost:3000
- Auto-start dev server before tests
- Generate HTML report
- Screenshot on failure
- Trace on first retry

## CI/CD Integration

These tests can be integrated into your CI/CD pipeline. On CI:

- Tests run with 2 retries for flaky test resilience
- Tests run sequentially (1 worker) to avoid resource issues
- Dev server starts automatically before tests

## Debugging Tests

### Use Playwright Inspector

```bash
npx playwright test --debug
```

### Use VS Code Extension

Install the [Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) extension for:

- Running tests directly from the editor
- Setting breakpoints
- Viewing test results inline

## Best Practices

1. **Use User-Facing Locators**: Prefer `getByRole`, `getByText`, `getByLabel` over CSS selectors
2. **Wait for Elements**: Playwright auto-waits, but use `expect().toBeVisible()` when needed
3. **Isolate Tests**: Each test should be independent and not rely on others
4. **Use beforeEach**: Set up common state in `beforeEach` hooks
5. **Clear Test Names**: Write descriptive test names that explain the expected behavior

## Troubleshooting

### Tests fail with "Target closed"

The dev server might not have started. Ensure:
- Port 3000 is available
- Dev server starts correctly: `npm run dev`

### Element not found errors

- Check if element text/role changed
- Use Playwright Inspector to debug selectors: `npx playwright test --debug`
- Increase timeout if needed in specific tests

### Flaky tests

- Ensure proper waits using `expect().toBeVisible()`
- Check for animations that might interfere
- Use `page.waitForLoadState()` if needed
