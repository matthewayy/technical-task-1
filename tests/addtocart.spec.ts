import { test, expect } from '@playwright/test';
import { login } from './helpers';

// Test for adding items to the cart, removing them and verifying if the cart count updates correctly.
// That's one of the core functionalities of any e-commerce platform.

test.describe('Add item to the cart test', () => {
    test('Add product to the cart and check if count+1', async ({page}) => {
    test.setTimeout(120000);
    await login(page);

    await page.waitForURL('https://www.saucedemo.com/inventory.html', { timeout: 10000 });
    
    const addToCartBackpack = page.getByRole('button', { name: 'Add to cart' }).first();
    await addToCartBackpack.click();

    const addToCartBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await addToCartBikeLight.click();

    const cart = page.locator('[data-test="shopping-cart-link"]');
    await cart.click();

    await page.waitForURL('https://www.saucedemo.com/cart.html', { timeout: 10000 });
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    await expect(cartBadge).toHaveText('2');

    const removeButton = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    await removeButton.click();

    await expect(cartBadge).toHaveText('1');
    });
});
