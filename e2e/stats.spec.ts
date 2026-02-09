import { test, expect } from '@playwright/test';

test.describe('Stats View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Navigate to Stats view
    await page.getByRole('button').filter({ hasText: 'Stats' }).click();
  });

  test('should display Stats view correctly', async ({ page }) => {
    await expect(page.getByText('Spending Statistics')).toBeVisible();
    await expect(page.getByText('Total Spent')).toBeVisible();
  });

  test('should display period selector', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Weekly' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Monthly' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Yearly' })).toBeVisible();
  });

  test('should display summary cards', async ({ page }) => {
    await expect(page.getByText('Daily Average')).toBeVisible();
    await expect(page.getByText('Budget Left')).toBeVisible();
  });

  test('should display top categories section', async ({ page }) => {
    await expect(page.getByText('Top Categories')).toBeVisible();
    await expect(page.getByText('View All')).toBeVisible();

    // Verify some categories are displayed
    await expect(page.getByText('Food & Drink')).toBeVisible();
    await expect(page.getByText('Shopping')).toBeVisible();
  });

  test('should display spending trend chart', async ({ page }) => {
    await expect(page.getByText('Spending Trend')).toBeVisible();
    await expect(page.getByText('Last 30 Days')).toBeVisible();
  });

  test('should have Generate Full Report button', async ({ page }) => {
    const reportButton = page.getByRole('button').filter({ hasText: 'Generate Full Report' });
    await expect(reportButton).toBeVisible();
  });

  test('should have back navigation', async ({ page }) => {
    const backButton = page.getByRole('button').filter({ has: page.locator('text=arrow_back_ios') });
    await expect(backButton).toBeVisible();
  });

  test('should have share button', async ({ page }) => {
    const shareButton = page.locator('button').filter({ has: page.locator('text=share') });
    await expect(shareButton).toBeVisible();
  });
});
