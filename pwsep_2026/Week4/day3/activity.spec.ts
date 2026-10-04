import { test } from '@playwright/test';

test('Handle Child Window', async ({ page }) => {

  await page.goto('https://www.leafground.com/window.xhtml');

  console.log('Main Page Title:', await page.title());

  const childPagePromise = page.waitForEvent('popup');

  await page.getByText('Open').click();

  const childPage = await childPagePromise;

  await childPage.waitForLoadState();

  console.log('Child Page Title:', await childPage.title());

  await childPage.getByPlaceholder('Email').fill('test@gmail.com');
  await childPage.getByPlaceholder('Message').fill('Playwright window handling');

});