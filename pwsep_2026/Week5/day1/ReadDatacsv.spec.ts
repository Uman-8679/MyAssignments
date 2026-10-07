import { expect, test } from "@playwright/test"
import { parse } from "csv-parse/sync"
import fs from 'fs'
import path from 'path'

let JSObj: any[] = parse(fs.readFileSync('Utils/loginData.csv', 'utf-8'), { columns: true, skip_empty_lines: true })

test.describe.serial('Run tests in serial mode', async () => {

    for (let loginData of JSObj) {
        test(`Read data from CSV file ${loginData.username}`, async ({ page }) => {
            await page.goto(loginData.url)
            await page.locator('#username').fill(loginData.username)
            await page.locator('#password').fill(loginData.password)
            await page.locator('.decorativeSubmit').click()
            await expect(page.getByRole('heading', { name: 'Welcome Demo B2C CSR' })).toBeVisible
        })
    }
})