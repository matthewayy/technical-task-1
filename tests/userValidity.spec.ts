import { test, expect } from '@playwright/test';
import { users } from './data/users';

// Test for checking user login validity. I think it's essential to ensure that only valid users can access the system.

test.describe('Test for valid users', () => {
    for (const user of users) {
        test(`Check login validity for ${user.username}`, async ({ page }) => {
            test.setTimeout(120000);
            await page.goto('/');
            await page.fill('#user-name', user.username);
            await page.fill('#password', 'secret_sauce');
            await page.click('#login-button');

            if (user.expected === 'success') {
                await page.waitForURL('https://www.saucedemo.com/inventory.html', { timeout: 10000 });
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                
            } else {
                await expect(page.locator('[data-test="error"]')).toBeVisible();
                await page.screenshot({ path: `tests/screenshots/${user.username}_login_error.png` });
            }
        });
    }
});