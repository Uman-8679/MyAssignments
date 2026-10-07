import { test, expect } from '@playwright/test';

test('Create Lead using data parameterization', async ({ page }) => {

  // Test data
  const companyName = 'ABC Technologies';
  const firstName = 'Uma';
  const lastName = 'Maheswari';

  // 1. Navigate to Leaftaps
  await page.goto('http://leaftaps.com/opentaps/control/main');

  // 2. Enter Username
  await page.locator('#username').fill('DemoCSR');

  // 3. Enter Password
  await page.locator('#password').fill('crmsfa');

  // 4. Click Login
  await page.locator('.decorativeSubmit').click();

  // 5. Click CRM/SFA
  await page.getByText('CRM/SFA', { exact: true }).click();

  // 6. Click Leads
  await page.getByText('Leads', { exact: true }).click();

  // 7. Click Create Lead
  await page.getByText('Create Lead', { exact: true }).click();

  // 8. Fill mandatory fields

  // Company Name
  await page.locator('#createLeadForm_companyName').fill(companyName);

  // First Name
  await page.locator('#createLeadForm_firstName').fill(firstName);

  // Last Name
  await page.locator('#createLeadForm_lastName').fill(lastName);

  // 9. Select Direct Mail using label
  await page
    .locator('#createLeadForm_dataSourceId')
    .selectOption({ label: 'Direct Mail' });

  // 10. Select Demo Marketing Campaign using value
  await page
    .locator('#createLeadForm_marketingCampaignId')
    .selectOption({ label: 'Demo Marketing Campaign' });

  // 11. Get Marketing Campaign count
  const marketingCampaign = page.locator(
    '#createLeadForm_marketingCampaignId option'
  );

  const marketingCampaignCount = await marketingCampaign.count();

  console.log('Marketing Campaign Count:', marketingCampaignCount);

  // Print all Marketing Campaign values
  for (let i = 0; i < marketingCampaignCount; i++) {
    console.log(
      'Marketing Campaign:',
      await marketingCampaign.nth(i).innerText()
    );
  }

  // 12. Select General Services using index
  await page
    .locator('#createLeadForm_industryEnumId')
    .selectOption({ index: 2 });

  // 13. Select INR from Preferred Currency
  await page
    .locator('#createLeadForm_currencyUomId')
    .selectOption({ label: 'INR' });

  // 14. Select India from Country
  await page
    .locator('#createLeadForm_generalCountryGeoId')
    .selectOption({ label: 'India' });

  // 15. Select any state
  const stateDropdown = page.locator('#createLeadForm_generalStateProvinceGeoId');

  await stateDropdown.selectOption({ index: 1 });

  // 16. Get count of all states
  const stateOptions = stateDropdown.locator('option');

  const stateCount = await stateOptions.count();

  console.log('State Count:', stateCount);

  // Print all states
  for (let i = 0; i < stateCount; i++) {
    console.log(
      'State:',
      await stateOptions.nth(i).innerText()
    );
  }

  // 17. Click Create Lead
  await page.getByRole('button', { name: 'Create Lead' }).click();

  // Verify lead was created
  await expect(
    page.getByText(firstName, { exact: true })
  ).toBeVisible();

  console.log('Lead created successfully');
});