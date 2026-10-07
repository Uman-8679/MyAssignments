import { test, expect } from '@playwright/test';
import path from 'path';

test.use({
  headless: false
});

test('Salesforce - Create Account and Upload File', async ({ page }) => {

  // 1. Navigate to Salesforce Login
  await page.goto('https://login.salesforce.com');

  // 2. Enter Username
  await page.locator('#username').fill('YOUR_USERNAME');

  // 3. Enter Password
  await page.locator('#password').fill('YOUR_PASSWORD');

  // 4. Click Login
  await page.locator('#Login').click();

  // Wait for Salesforce to load
  await page.waitForLoadState('domcontentloaded');

  // 5. Click App Launcher
  await page.getByRole('button', { name: 'App Launcher' }).click();

  // 6. Click View All
  await page.getByText('View All', { exact: true }).click();

  // 7. Search Accounts in App Launcher
  const searchBox = page.getByPlaceholder('Search apps or items...');

  await searchBox.fill('Accounts');

  // 8. Click Accounts
  await page.getByText('Accounts', { exact: true }).click();

  // Wait for Accounts page
  await page.waitForLoadState('domcontentloaded');

  // 9. Click New
  await page.getByRole('button', { name: 'New' }).click();

  // 10. Enter Account Name
  const accountName = 'Playwright Test Account';

  await page.getByLabel('Account Name').fill(accountName);

  // 11. Select Rating = Warm
  await page.getByLabel('Rating').click();
  await page.getByText('Warm', { exact: true }).click();

  // 12. Select Type = Prospect
  await page.getByLabel('Type').click();
  await page.getByText('Prospect', { exact: true }).click();

  // 13. Select Industry = Banking
  await page.getByLabel('Industry').click();
  await page.getByText('Banking', { exact: true }).click();

  // 14. Select Ownership = Public
  await page.getByLabel('Ownership').click();
  await page.getByText('Public', { exact: true }).click();

  // 15. Click Save
  await page.getByRole('button', { name: 'Save' }).click();

  // 16. Verify Account was created
  await expect(
    page.getByText(accountName, { exact: true }).first()
  ).toBeVisible();

  console.log('Account created successfully');

  // ----------------------------------------------------
  // FILE UPLOAD
  // ----------------------------------------------------

  // 17. Click Related tab
  await page.getByText('Related', { exact: true }).click();

  // 18. Locate Files section and click Upload Files
  await page.getByText('Upload Files', { exact: true }).click();

  // 19. Prepare file path
  const filePath = path.resolve('files/testfile.pdf');

  // 20. Upload file using setInputFiles()
  await page.locator('input[type="file"]').setInputFiles(filePath);

  // 21. Verify uploaded file is displayed
  await expect(
    page.getByText('testfile.pdf', { exact: true })
  ).toBeVisible();

  // 22. Click Done
  await page.getByRole('button', { name: 'Done' }).click();

  // 23. Verify uploaded file
  await expect(
    page.getByText('testfile.pdf', { exact: true })
  ).toBeVisible();

  console.log('File uploaded successfully');
});