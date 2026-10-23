import {test, expect, Locator} from '@playwright/test';
import AddCardItems from '../page-object/addCardItems';
import LoginPage from '../page-object/login';
import AddFavoriteItems from '../page-object/addFavoriteItems';
import CheckoutItems from '../page-object/checkoutItems';
import { getAdminCredentials, getCustomerCredentials } from './credentials';

let addCardItems: AddCardItems;
let login: LoginPage;
let addFavoriteItems: AddFavoriteItems;
let checkoutItems: CheckoutItems;


test.beforeEach(async ({ page }) => {
  addCardItems = new AddCardItems(page);
  login = new LoginPage(page);
  addFavoriteItems = new AddFavoriteItems(page);
  checkoutItems = new CheckoutItems(page);
  await page.goto('https://practicesoftwaretesting.com/');
  await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
});

test.describe('Carrito Tests', () => {
  test('TC03: Verificar la página de inicio y sus productos', async ({ page }) => {
    await login.IniciarSesionLink.click();
    const credentials = getCustomerCredentials();
    await login.login(credentials.email, credentials.password);
    await page.getByRole('link', { name: 'Inicio' }).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/');
    //await page.waitForLoadState();
    const productCount = await page.locator('.card-title').count();
    console.log(productCount);

    for (let i = 0; i < productCount; i++) {
      const productName = await page.locator('.card-title').nth(i).innerText();
      console.log(`Producto ${i + 1}: ${productName}`);
    }

  })
   test('TC04: Verify home page and ordenar productos de la A a la Z', async ({ page }) => {
       await login.IniciarSesionLink.click();
       await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
       const credentials = getCustomerCredentials();
       await login.login(credentials.email, credentials.password);
       await page.getByRole('link', { name: 'Inicio' }).click();
       await page.locator('.form-select').selectOption('Nombre (A - Z)');
     });

   test('TC05: Agregar productos al carrito', async ({ page }) => {
       await login.IniciarSesionLink.click();
       await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
       const credentials = getCustomerCredentials();
       await login.login(credentials.email, credentials.password);
       await page.getByRole('link', { name: 'Inicio' }).click();
       await addCardItems.BuscarUnProducto('Hammer');
       await addCardItems.AgregarMasProductosAlCarrito(2);
       const cantidad = await addCardItems.cantidadDeProductosEnCarrito.allTextContents();
       console.log(`Cantidad de productos en el carrito: ${cantidad}`);
       await addCardItems.CarritoButton.click();
   });
   test('TC06: Añadir a productos a favoritos', async ({ page }) => {
       await login.IniciarSesionLink.click();
       await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
       const credentials = getCustomerCredentials();
       await login.login(credentials.email, credentials.password);
       await page.getByRole('link', { name: 'Inicio' }).click();
       await addCardItems.BuscarUnProducto('Hammer');
       await addFavoriteItems.AgregarMasProductosAFavoritos(3);
       await addFavoriteItems.UsuarioLink.hover();
       await addFavoriteItems.UsuarioLink.click();
       await addFavoriteItems.SeccionFavoritosLink.click();
       const tituloFavoritos = page.locator('h1:has-text("Favoritos")');
       const productosFavoritos = page.locator('.card.mb-3');
       const cantidadFav = await productosFavoritos.count();

      //console.log(await tituloFavoritos.textContent()); // "Favoritos"
      console.log(`Cantidad de productos en favoritos es: ${cantidadFav}`);


   });

   test ('TC07 : Checkout de productos en el carrito', async ({ page }) => {
      await login.IniciarSesionLink.click();
       await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
       const credentials = getAdminCredentials();
       await login.login(credentials.email, credentials.password);
       await page.getByRole('link', { name: 'Inicio' }).click();
       await addCardItems.BuscarUnProducto('Hammer');
       await addCardItems.AgregarMasProductosAlCarrito(2);
       const cantidad = await addCardItems.cantidadDeProductosEnCarrito.allTextContents();
       console.log(`Cantidad de productos en el carrito: ${cantidad}`);
       await addCardItems.CarritoButton.click();
       await checkoutItems.ProductosEnCarrito;
       await checkoutItems.ProcederAlPagoButton.click();
       await checkoutItems.visualizarMensajeCarrito();

  });

});
