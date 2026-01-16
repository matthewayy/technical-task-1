import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';


// Test for logging in and logging out with a valid user. It's essential to verify that users can successfully log in and log out of the system.

test.describe('Login and log out test', () => {
    test('Login with standard_user and log out' , async ({page}) => {
        
        const login = new LoginPage(page);
        
        await login.goto();
        console.log(process.env.SAUCE_USERNAME)
        await login.login();
        
        await expect(page.getByText('Products')).toBeVisible();
        await page.waitForLoadState('networkidle');

        // Log out 
        await login.logout();
    });
});