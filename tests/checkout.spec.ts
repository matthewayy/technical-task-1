import { test, expect } from '@playwright/test';
import { login } from './helpers';

// Test for completing the checkout process from adding items to the cart to finalizing the order.
// I think it's important to test the entire checkout flow as it can be critical part of the user experience on an e-commerce platform.

test.describe('Checkout test', () => {
    test('Complete checkout process', async ({page}) => {
        test.setTimeout(120000);
        await login(page);

        await page.waitForURL('https://www.saucedemo.com/inventory.html', { timeout: 10000 });

        const addToCartBlackTshirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        await addToCartBlackTshirt.click();
        const addToCartRedTshirt = page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
        await addToCartRedTshirt.click();

        const cart = page.locator('[data-test="shopping-cart-link"]');
        await cart.click();

        await page.waitForURL('https://www.saucedemo.com/cart.html', { timeout: 10000 });

        const checkoutButton = page.getByRole('button', { name: 'Checkout' });
        await checkoutButton.click();
        await page.waitForURL('https://www.saucedemo.com/checkout-step-one.html', { timeout: 10000 });

        await page.fill('[data-test="firstName"]', 'Matej');
        await page.fill('[data-test="lastName"]', 'Tester');
        await page.fill('[data-test="postalCode"]', '12345');
        await page.click('[data-test="continue"]');

        await page.waitForURL('https://www.saucedemo.com/checkout-step-two.html', { timeout: 10000 });

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        const finishButton = page.getByRole('button', { name: 'Finish' });
        await finishButton.click();
        await page.waitForURL('https://www.saucedemo.com/checkout-complete.html', { timeout: 10000 });

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(page.getByText('Thank you for your order!')).toBeVisible();
    });
});