import { test, expect } from '@playwright/test';
import { login } from './helpers';


// Test for logging in and logging out with a valid user. It's essential to verify that users can successfully log in and log out of the system.

test.describe('Login and log out test', () => {
    test('Login with standard_user and log out' , async ({page}) => {
        await login(page);

        await page.waitForURL('https://www.saucedemo.com/inventory.html', { timeout: 10000 });
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Products')).toBeVisible();

        // Log out 
        const menuButton = page.getByRole('button', { name: 'Open Menu' });
        await menuButton.click();
        const logout = page.locator('[data-test="logout-sidebar-link"]');
        await logout.click();

        await page.waitForURL('https://www.saucedemo.com/', { timeout: 10000 });
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
});