import {Page, test,expect} from '@playwright/test';
import LoginPage from '../page-object/login';
import AddCardItems from '../page-object/addCardItems';
import CheckoutItems from '../page-object/checkoutItems';
import DireccionItems from '../page-object/direcciónItems';
import { getAdminCredentials, getCheckoutAddress } from './credentials';

let login: LoginPage;
let addCardItems: AddCardItems;
let checkoutItems: CheckoutItems;
let direccionItems: DireccionItems;

test.beforeEach(async ({ page }) => {
    addCardItems = new AddCardItems(page);
    login = new LoginPage(page);
    checkoutItems = new CheckoutItems(page);
    direccionItems = new DireccionItems(page);
    await page.goto('https://practicesoftwaretesting.com/');
    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    await login.IniciarSesionLink.click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
    const credentials = getAdminCredentials();
    await login.login(credentials.email, credentials.password);
});

test('TC08: Verificar la dirección de facturación', async ({ page }) => {    
           await page.getByRole('link', { name: 'Inicio' }).click();
           await addCardItems.BuscarUnProducto('Hammer');
           await addCardItems.AgregarMasProductosAlCarrito(2);
           const cantidad = await addCardItems.cantidadDeProductosEnCarrito.allTextContents();
           console.log(`Cantidad de productos en el carrito: ${cantidad}`);
           await addCardItems.CarritoButton.click();
           await checkoutItems.ProductosEnCarrito;
           await checkoutItems.ProcederAlPagoButton.click();
           await checkoutItems.visualizarMensajeCarrito();
           await checkoutItems.ProcederAlPagoButton.click();
           const address = getCheckoutAddress();
           await direccionItems.completarDireccion(
             address.postalCode,
             address.number,
             address.street,
             address.city,
             address.state,
           );
           await checkoutItems.ProcederAlPagoButton.click();

});