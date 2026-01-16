import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

    private userNameInput = this.page.locator('#user-name');
    private passwordInput = this.page.locator('#password');
    private loginButton = this.page.locator('#login-button');

    async goto() {
        await this.page.goto('https://www.saucedemo.com/', { timeout: 60000 });
    }

    async login(
        username: string = process.env.SAUCE_USERNAME || '',
        password: string = process.env.SAUCE_PASSWORD || ''
    ) {
        console.log(`login s menom: ${username}`)
        if (!username || !password) {
            throw new Error('Username and password must be provided');
        }
        
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();   
    }

    async logout() {
        const menuButton = this.page.getByRole('button', { name: 'Open Menu' });
        await menuButton.click({ force: true });
        const logoutLink = this.page.locator('[data-test="logout-sidebar-link"]');
        await logoutLink.waitFor({ state: 'visible', timeout: 5000 });
        await logoutLink.click();
        await expect(this.loginButton).toBeVisible();
    }
}