import { test, expect } from '@playwright/test';

test.describe('Home View', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the main app container is present
    await expect(page.locator('#root')).toBeVisible();

    // Verify user greeting is displayed
    await expect(page.getByText('Good Morning,')).toBeVisible();
    await expect(page.getByText('Alex Rivera')).toBeVisible();
  });

  test('should display total balance card', async ({ page }) => {
    await page.goto('/');

    // Check for Total Balance text
    await expect(page.getByText('Total Balance')).toBeVisible();

    // Verify balance amount is displayed (should contain $ symbol)
    const balanceElement = page.locator('h2').filter({ hasText: '$' }).first();
    await expect(balanceElement).toBeVisible();
  });

  test('should display income and expenses stats', async ({ page }) => {
    await page.goto('/');

    // Check for Income and Expenses labels
    await expect(page.getByText('Income')).toBeVisible();
    await expect(page.getByText('Expenses')).toBeVisible();
  });

  test('should display monthly budget section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Monthly Budget')).toBeVisible();
    await expect(page.getByText(/remaining/i)).toBeVisible();
  });

  test('should display recent transactions', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Recent Transactions')).toBeVisible();
    await expect(page.getByText('See All')).toBeVisible();

    // Verify at least one transaction is displayed
    await expect(page.getByText('Starbucks')).toBeVisible();
  });

  test('should have working search and notification buttons', async ({ page }) => {
    await page.goto('/');

    // Check for search button
    const searchButton = page.getByRole('button').filter({ has: page.locator('text=search') });
    await expect(searchButton).toBeVisible();

    // Check for notification button
    const notificationButton = page.getByRole('button').filter({ has: page.locator('text=notifications') });
    await expect(notificationButton).toBeVisible();
  });
});
