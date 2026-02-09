import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Stats view', async ({ page }) => {
    // Click on Stats navigation button
    await page.getByRole('button').filter({ hasText: 'Stats' }).click();

    // Verify Stats view is displayed
    await expect(page.getByText('Spending Statistics')).toBeVisible();
    await expect(page.getByText('Total Spent')).toBeVisible();
  });

  test('should navigate to Assets view', async ({ page }) => {
    // Click on Assets navigation button
    await page.getByRole('button').filter({ hasText: 'Assets' }).click();

    // Verify Assets view is displayed
    await expect(page.getByText('My Assets')).toBeVisible();
    await expect(page.getByText('Total Net Worth')).toBeVisible();
  });

  test('should navigate to Settings view', async ({ page }) => {
    // Click on Settings navigation button
    await page.getByRole('button').filter({ hasText: 'Settings' }).click();

    // Verify Settings view is displayed
    await expect(page.getByText('Settings', { exact: true })).toBeVisible();
    await expect(page.getByText('Profile management')).toBeVisible();
  });

  test('should navigate back to Home view', async ({ page }) => {
    // Navigate to Stats
    await page.getByRole('button').filter({ hasText: 'Stats' }).click();
    await expect(page.getByText('Spending Statistics')).toBeVisible();

    // Navigate back to Home
    await page.getByRole('button').filter({ hasText: 'Home' }).click();
    await expect(page.getByText('Recent Transactions')).toBeVisible();
  });

  test('should open Add Transaction view', async ({ page }) => {
    // Click the Add button (the floating action button)
    await page.locator('button').filter({ has: page.locator('text=add') }).click();

    // Verify Add Transaction view is displayed
    await expect(page.getByText('Add Expense')).toBeVisible();
    await expect(page.getByText('Enter Amount')).toBeVisible();
    await expect(page.getByText('Select Category')).toBeVisible();
  });
});
