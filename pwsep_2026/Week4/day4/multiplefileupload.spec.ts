import { test, expect } from '@playwright/test';
import path from 'path';

test('Multiple Image File Upload', async ({ page }) => {

  // 1. Navigate to LeafGround file upload page
  await page.goto('https://www.leafground.com/file.xhtml');

  // 2. Locate the Advanced Upload file input
  const fileUploadReference = page.locator('input[type="file"]').nth(1);

  // 3. Prepare the file paths
  const file1 = path.join(__dirname, 'files', 'image1.jpg');
  const file2 = path.join(__dirname, 'files', 'image2.png');

  // 4. Upload multiple files
  await fileUploadReference.setInputFiles([
    file1,
    file2
  ]);

  // 5. Verify both files are selected
  await expect(page.getByText('image1.jpg')).toBeVisible();
  await expect(page.getByText('image2.png')).toBeVisible();
});