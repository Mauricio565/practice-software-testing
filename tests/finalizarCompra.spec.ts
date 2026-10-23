import {Page, test,expect} from '@playwright/test';
import LoginPage from '../page-object/login';
import AddCardItems from '../page-object/addCardItems';
import CheckoutItems from '../page-object/checkoutItems';
import DireccionItems from '../page-object/direcciónItems';
import Pago from '../page-object/pago';
import {
  getURLCredentials,
  getAdminCredentials,
  getBankTransferDetails,
  getCheckoutAddress,
  getCreditCardDetails,
  getGiftCardDetails,
} from './credentials';

let login: LoginPage;
let addCardItems: AddCardItems;
let checkoutItems: CheckoutItems;
let direccionItems: DireccionItems;
let pago: Pago;

test.beforeEach(async ({ page }) => {
    addCardItems = new AddCardItems(page);
    login = new LoginPage(page);
    checkoutItems = new CheckoutItems(page);
    direccionItems = new DireccionItems(page);
    pago = new Pago(page)
    const credentialURL = getURLCredentials();
    await page.goto(credentialURL.url);
    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
    await login.IniciarSesionLink.click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');
    const credentials = getAdminCredentials();
    await login.login(credentials.email, credentials.password);
});

test.describe('Finalizar compra con distantas formas de pago', () => {

  test('Pago con tranferencia bancaria', async ({page}) => {
     const address = getCheckoutAddress();
     const bankTransfer = getBankTransferDetails();
     await page.getByRole('link', { name: 'Inicio' }).click(); // Ir a la página de inicio
     await addCardItems.BuscarUnProducto('Hammer'); // Buscar el producto "Hammer"
     await addCardItems.AgregarMasProductosAlCarrito(2); // Agregar 2 productos al carrito
       const cantidad = await addCardItems.cantidadDeProductosEnCarrito.allTextContents(); // Obtener la cantidad de productos en el carrito
           console.log(`Cantidad de productos en el carrito: ${cantidad}`); // Mostrar la cantidad de productos en el carrito
     await addCardItems.CarritoButton.click(); // Ir al carrito
     await expect(checkoutItems.ProductosEnCarrito).toBeVisible(); // Verificar que los productos en el carrito sean visibles
     await checkoutItems.ProcederAlPagoButton.click(); // Proceder al pago
     await checkoutItems.visualizarMensajeCarrito(); // Verificar el mensaje de producto agregado
     await checkoutItems.ProcederAlPagoButton.click(); // Proceder al pago
     await direccionItems.completarDireccion(address.postalCode, address.number, address.street, address.city, address.state); // Completar la dirección
     await checkoutItems.ProcederAlPagoButton.click(); // Proceder al pago
     await pago.pagoTransferenciaBancaria(bankTransfer.bankName, bankTransfer.accountHolder, bankTransfer.accountNumber); // Pagar con transferencia bancaria
     await pago.ConfirmarButton.click(); // Confirmar
     const idcompra = page.locator('div span').nth(9) // Obtener el número de compra
     await expect (pago.mensajeDeCompraExitosa.getByText(`¡Gracias por tu pedido! Tu número de factura es ${idcompra}`)).toBeVisible(); // Verificar el mensaje de compra exitosa

})   
test('Pago con Contra reembolso', async ({page}) => {
     const address = getCheckoutAddress(); // Dirección de envío
     await page.getByRole('link', { name: 'Inicio' }).click(); // Ir a la página de inicio
     await addCardItems.BuscarUnProducto('Hammer'); // Buscar el producto "Hammer"
     await addCardItems.AgregarMasProductosAlCarrito(2); // Agregar 2 productos al carrito
       const cantidad = await addCardItems.cantidadDeProductosEnCarrito.allTextContents(); // Obtener la cantidad de productos en el carrito
        console.log(`Cantidad de productos en el carrito: ${cantidad}`); // Mostrar la cantidad de productos en el carrito
     await addCardItems.CarritoButton.click(); // Ir al carrito
     await checkoutItems.ProductosEnCarrito; // Verificar que los productos en el carrito sean visibles
     await checkoutItems.ProcederAlPagoButton.click(); // Proceder al pago
     await checkoutItems.visualizarMensajeCarrito(); // Verificar el mensaje de producto agregado
     await checkoutItems.ProcederAlPagoButton.click(); // Proceder al pago
     await direccionItems.completarDireccion(address.postalCode, address.number, address.street, address.city, address.state); // Completar la dirección
     await checkoutItems.ProcederAlPagoButton.click(); // Proceder al pago
     await pago.pagoInput.selectOption({label:'Contra reembolso'}); // Seleccionar "Contra reembolso"
     await pago.verificarPagoButton.click(); // Verificar el pago
     await pago.ConfirmarButton.click(); // Confirmar
     const idcompra = page.locator('div span').nth(9) // Obtener el número de compra
     await expect(pago.mensajeDeCompraExitosa.getByText(`¡Gracias por tu pedido! Tu número de factura es ${idcompra}`)); // Verificar el mensaje de compra exitosa

})

test('Pago con tarjeta de crédito', async ({page}) => {
  const address = getCheckoutAddress();
  const creditCard = getCreditCardDetails();
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
     await direccionItems.completarDireccion(address.postalCode, address.number, address.street, address.city, address.state);
     await checkoutItems.ProcederAlPagoButton.click();
     await pago.pagoTarjetaDeCredito(creditCard.number, creditCard.expirationDate, creditCard.cvv, creditCard.cardholder);
     await pago.ConfirmarButton.click();
     const idcompra = page.locator('div span').nth(9)
     await expect(pago.mensajeDeCompraExitosa.getByText(`¡Gracias por tu pedido! Tu número de factura es ${idcompra}`));
    
})

test('Pago con Compro ahora, pago despues', async ({page}) => {
     const address = getCheckoutAddress();
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
     await direccionItems.completarDireccion(address.postalCode, address.number, address.street, address.city, address.state);
     await checkoutItems.ProcederAlPagoButton.click();
     await pago.pagoPagoAhoraPagaDespues();
     await pago.ConfirmarButton.click();
     const idcompra = page.locator('div span').nth(9)
     await expect(pago.mensajeDeCompraExitosa.getByText(`¡Gracias por tu pedido! Tu número de factura es ${idcompra}`));

})

test('Pago con Tarjeta de regalo', async ({page}) => {
     const address = getCheckoutAddress();
     const giftCard = getGiftCardDetails();
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
     await direccionItems.completarDireccion(address.postalCode, address.number, address.street, address.city, address.state);
     await checkoutItems.ProcederAlPagoButton.click();
     await pago.pagoTarjetaDeRegalo(giftCard.number, giftCard.validationCode);
     await pago.ConfirmarButton.click();
     const idcompra = page.locator('div span').nth(9)
     await expect(pago.mensajeDeCompraExitosa.getByText(`¡Gracias por tu pedido! Tu número de factura es ${idcompra}`));

})

})//