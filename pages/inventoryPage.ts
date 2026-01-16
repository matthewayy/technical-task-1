import { expect, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  addProductByTestId(testId: string) {
    return this.page.locator(`[data-test="${testId}"]`).click();
  }

  async goToCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
    await this.page.waitForURL('/cart.html', { timeout: 10000 });
    await expect(this.page).toHaveURL('/cart.html');
  }
}
