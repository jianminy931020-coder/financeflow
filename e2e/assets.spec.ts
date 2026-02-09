import { test, expect } from '@playwright/test';

test.describe('Assets View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to Assets view
    await page.getByRole('button').filter({ hasText: 'Assets' }).click();
  });

  test('should display Assets view correctly', async ({ page }) => {
    await expect(page.getByText('My Assets')).toBeVisible();
    await expect(page.getByText('Total Net Worth')).toBeVisible();
  });

  test('should display asset cards', async ({ page }) => {
    // Check for different asset types
    await expect(page.getByText('Cash')).toBeVisible();
    await expect(page.getByText('Bank Card')).toBeVisible();
    await expect(page.getByText('Credit Card')).toBeVisible();
    await expect(page.getByText('Digital Wallet')).toBeVisible();
  });

  test('should display asset providers', async ({ page }) => {
    await expect(page.getByText('Liquid Assets')).toBeVisible();
    await expect(page.getByText(/Chase/)).toBeVisible();
    await expect(page.getByText(/Apple Card/)).toBeVisible();
  });

  test('should display asset amounts', async ({ page }) => {
    // Verify amounts are displayed with $ symbol
    const amounts = page.locator('p').filter({ hasText: /^\$/ });
    await expect(amounts.first()).toBeVisible();
  });

  test('should display Total Net Worth section', async ({ page }) => {
    await expect(page.getByText('Total Net Worth', { exact: true })).toBeVisible();

    // Verify net worth amount is displayed
    const netWorthAmount = page.locator('p').filter({ hasText: /^\$/ }).and(page.locator('.text-4xl'));
    await expect(netWorthAmount).toBeVisible();
  });

  test('should have visibility toggle button', async ({ page }) => {
    const visibilityButton = page.locator('button').filter({ has: page.locator('text=visibility') });
    await expect(visibilityButton).toBeVisible();
  });

  test('should have add asset button', async ({ page }) => {
    const addButton = page.locator('button').filter({ has: page.locator('text=add_circle') });
    await expect(addButton).toBeVisible();
  });

  test('should display credit card Pay Bill button', async ({ page }) => {
    // Look for the Pay Bill button on credit card
    const payBillButton = page.getByRole('button', { name: 'Pay Bill' });
    await expect(payBillButton).toBeVisible();
  });

  test('should display spending insight', async ({ page }) => {
    await expect(page.getByText(/Monthly spending/)).toBeVisible();
  });
});
