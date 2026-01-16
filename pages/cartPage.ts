import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async expectProductVisible(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async removeProduct(testId: string) {
    await this.page.locator(`[data-test="${testId}"]`).click();
  }

  async expectCartCount(count: number) {
    await expect(
      this.page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText(count.toString());
  }

  async goToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
    await this.page.waitForURL('/checkout-step-one.html', { timeout: 10000 });
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }

}
