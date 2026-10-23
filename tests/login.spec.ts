import { test, expect } from '@playwright/test';
import Login from '../page-object/login';
import { getAdminCredentials } from './credentials';

let login: Login;

test.beforeEach(async ({ page }) => {
  login = new Login(page);
  await page.goto('https://practicesoftwaretesting.com/');
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
});

test.describe('Login Tests', () => {
  test('TC01: Login happy path', async ({ page }) => {
    await login.IniciarSesionLink.click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
    const credentials = getAdminCredentials();
    await login.login(credentials.email, credentials.password);
  });
  test('TC02: Login with invalid credentials', async ({ page }) => {
    await login.IniciarSesionLink.click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
    await login.login('invalid@example.com', 'invalidpassword');
    await expect(page.locator('.help-block')).toHaveText('Invalid email or password');
  });
});
