import { test as setup, expect } from '@playwright/test';

setup('Salesforce Login and Save Storage State', async ({ page }) => {

  // Navigate to Salesforce
  await page.goto('https://login.salesforce.com/');

  // Enter username
  await page.locator('#username').fill('YOUR_SALESFORCE_USERNAME');

  // Enter password
  await page.locator('#password').fill('YOUR_SALESFORCE_PASSWORD');

  // Click Login
  await page.locator('#Login').click();

  // Wait for Salesforce to load
  await page.waitForLoadState('domcontentloaded');

  // Verify successful login
  await expect(page).not.toHaveURL(/login\.salesforce\.com/);

  console.log('Salesforce login successful');

  // Save storage state
  await page.context().storageState({
    path: 'sf-storage.json'
  });

  console.log('Storage state saved successfully');
});