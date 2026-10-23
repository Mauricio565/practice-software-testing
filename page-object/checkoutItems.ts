import {Locator,expect,Page} from "@playwright/test";

export default class CheckoutItems {
    readonly page : Page;
    readonly ProductosEnCarrito: Locator;
    readonly ProcederAlPagoButton: Locator;
    readonly SeguirComprandoButton: Locator;
    readonly VaciarCarritoButton: Locator;
    readonly MensajeDeIniciarSesion: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ProductosEnCarrito = page.locator('.table table-hover');
        this.ProcederAlPagoButton = page.getByRole('button', { name: 'Proceder al pago' });
        this.SeguirComprandoButton = page.getByRole('button', { name: 'Seguir comprando' });
        this.VaciarCarritoButton = page.locator('.btn btn-danger');
        this.MensajeDeIniciarSesion = page.getByTestId('nav-menu');
    }
    async ProductosEnElCarrito() {
        await expect(this.ProductosEnCarrito).toBeVisible();
        const filas = this.page.locator('table.table.table-hover tbody tr');
       const cantidadFilas = await filas.count();
       console.log(`Cantidad de filas en la tabla: ${cantidadFilas}`);

        //await expect(fila).toBeVisible();
        for (let i = 0; i < cantidadFilas; i++) {
         const fila = filas.nth(i);

        const nombre = (await fila.locator('td').nth(1).innerText()).trim();
        const cantidadcart = await fila.locator('input[type="number"]').inputValue();
        const precio = (await fila.locator('td').nth(2).innerText()).trim();
        const total = (await fila.locator('td').nth(3).innerText()).trim();

        console.log(`Nombre: ${nombre}`);
        console.log(`Cantidad: ${cantidadcart}`);
        console.log(`Precio: ${precio}`);
        console.log(`Total: ${total}`);
       }


    }
  async visualizarMensajeCarrito () {
    await expect(this.page.getByText('Hola John Doe, ya has iniciado sesión. Puedes proceder al pago.',
        { exact: true })).toBeVisible();
  }
}
