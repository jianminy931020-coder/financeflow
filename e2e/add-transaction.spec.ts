import { test, expect } from '@playwright/test';

test.describe('Add Transaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Open Add Transaction view
    await page.locator('button').filter({ has: page.locator('text=add') }).click();
    await expect(page.getByText('Add Expense')).toBeVisible();
  });

  test('should display Add Transaction view correctly', async ({ page }) => {
    await expect(page.getByText('Enter Amount')).toBeVisible();
    await expect(page.getByText('Select Category')).toBeVisible();

    // Check for initial amount display
    await expect(page.locator('h1').filter({ hasText: '0' })).toBeVisible();

    // Verify close and reset buttons are present
    await expect(page.getByRole('button').filter({ has: page.locator('text=close') })).toBeVisible();
    await expect(page.getByText('Reset')).toBeVisible();
  });

  test('should input amount using number pad', async ({ page }) => {
    // Click numbers on the keypad
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();

    // Verify the amount is displayed
    await expect(page.locator('h1').filter({ hasText: '123' })).toBeVisible();
  });

  test('should handle decimal input', async ({ page }) => {
    // Input: 12.50
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '.', exact: true }).click();
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '0', exact: true }).click();

    await expect(page.locator('h1').filter({ hasText: '12.50' })).toBeVisible();
  });

  test('should handle backspace', async ({ page }) => {
    // Input some numbers
    await page.getByRole('button', { name: '5', exact: true }).click();
    await page.getByRole('button', { name: '6', exact: true }).click();
    await page.getByRole('button', { name: '7', exact: true }).click();

    // Click backspace
    await page.getByRole('button').filter({ has: page.locator('text=backspace') }).click();

    // Verify one digit is removed
    await expect(page.locator('h1').filter({ hasText: '56' })).toBeVisible();
  });

  test('should reset amount', async ({ page }) => {
    // Input some numbers
    await page.getByRole('button', { name: '9', exact: true }).click();
    await page.getByRole('button', { name: '9', exact: true }).click();

    // Click reset button
    await page.getByText('Reset').click();

    // Verify amount is reset to 0
    await expect(page.locator('h1').filter({ hasText: /^0$/ })).toBeVisible();
  });

  test('should select different categories', async ({ page }) => {
    // Select Food category (should be selected by default)
    const foodCategory = page.locator('div').filter({ hasText: 'Food' }).first();
    await expect(foodCategory).toHaveClass(/border-primary/);

    // Select Shopping category
    await page.locator('div').filter({ hasText: 'Shopping' }).first().click();
    const shoppingCategory = page.locator('div').filter({ hasText: 'Shopping' }).first();
    await expect(shoppingCategory).toHaveClass(/border-primary/);
  });

  test('should toggle between expense and income', async ({ page }) => {
    // Initially should be expense
    await expect(page.getByText('Add Expense')).toBeVisible();

    // Click to toggle to income
    await page.getByRole('button').filter({ has: page.locator('text=EXPENSE') }).click();
    await expect(page.getByText('Add Income')).toBeVisible();
    await expect(page.getByText('INCOME')).toBeVisible();

    // Toggle back to expense
    await page.getByRole('button').filter({ has: page.locator('text=INCOME') }).click();
    await expect(page.getByText('Add Expense')).toBeVisible();
  });

  test('should close Add Transaction view', async ({ page }) => {
    // Click close button
    await page.getByRole('button').filter({ has: page.locator('text=close') }).click();

    // Verify we're back at home view
    await expect(page.getByText('Recent Transactions')).toBeVisible();
  });

  test('should add a new transaction', async ({ page }) => {
    // Input amount
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: '5', exact: true }).click();

    // Select category (Shopping)
    await page.locator('div').filter({ hasText: 'Shopping' }).first().click();

    // Save transaction
    await page.getByRole('button').filter({ hasText: 'Save Transaction' }).click();

    // Verify we're back at home and transaction might be added
    await expect(page.getByText('Recent Transactions')).toBeVisible();
  });
});
