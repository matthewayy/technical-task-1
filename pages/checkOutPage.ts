import { expect, Page } from '@playwright/test';

export class CheckOutPage {
  constructor(private page: Page) {}

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill('[data-test="firstName"]', firstName);
        await this.page.fill('[data-test="lastName"]', lastName);
        await this.page.fill('[data-test="postalCode"]', postalCode);
        await this.page.locator('[data-test="continue"]').click();
    }

    async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click();
        await this.page.waitForURL('/checkout-complete.html', { timeout: 10000 });
    }
}