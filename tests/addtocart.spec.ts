import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { LoginPage } from '../pages/loginPage';

// Test for adding items to the cart, removing them and verifying if the cart count updates correctly.
// That's one of the core functionalities of any e-commerce platform.

test.describe('Add item to the cart test', () => {
    test('Add product to the cart and check if count+1', async ({page}) => {
    test.setTimeout(120000);

    const login = new LoginPage(page);
    await login.goto();
    await login.login();
    
    await expect(page).toHaveURL('/inventory.html');

    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    
    await inventory.addProductByTestId('add-to-cart-sauce-labs-backpack');
    await inventory.addProductByTestId('add-to-cart-sauce-labs-bike-light');

    await inventory.goToCart();

    await cart.expectProductVisible('Sauce Labs Backpack');
    await cart.expectProductVisible('Sauce Labs Bike Light');
    await cart.expectCartCount(2);

    await cart.removeProduct('remove-sauce-labs-bike-light');
    await cart.expectCartCount(1);
    });
});
