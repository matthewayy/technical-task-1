import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckOutPage } from '../pages/checkOutPage';
import { LoginPage } from '../pages/loginPage';

// Test for completing the checkout process from adding items to the cart to finalizing the order.
// I think it's important to test the entire checkout flow as it can be critical part of the user experience on an e-commerce platform.

test.describe('Checkout test', () => {
    test('Complete checkout process', async ({page}) => {
        test.setTimeout(120000);
        const login = new LoginPage(page);
        await login.goto();
        await login.login();

        const inventory = new InventoryPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckOutPage(page);

        await expect(page).toHaveURL('/inventory.html');

        await inventory.addProductByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
        await inventory.addProductByTestId('add-to-cart-test.allthethings()-t-shirt-(red)');
        await inventory.goToCart();
        await cart.goToCheckout();

        await checkout.fillCheckoutInformation('Matej', 'Tester', '12345');
        await checkout.finishCheckout();

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(page.getByText('Thank you for your order!')).toBeVisible();
    });
});