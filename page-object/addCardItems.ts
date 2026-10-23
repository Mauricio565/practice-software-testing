import {Locator, Page, expect} from "@playwright/test";
export default class AddCardItems {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly BuscarButton: Locator;
  readonly AgregarAlCarritoButton: Locator;
  readonly productos: Locator;
  readonly MensajeProductoAgregado: Locator;
  readonly InicioLink: Locator;
  readonly cantidadDeProductosEnCarrito: Locator;
  readonly CarritoButton: Locator;
  readonly UsuarioNombre: Locator;


  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByRole('textbox', { name: 'Buscar' });
    this.BuscarButton = page.getByRole('button', { name: 'Buscar' });
    this.AgregarAlCarritoButton = page.getByRole('button', { name: 'Añadir al carrito' });
    this.productos = page.locator('[data-test="search_completed"] a.card');
    this.MensajeProductoAgregado = page.getByRole('alert', { name: 'Producto añadido al carrito' });
    this.InicioLink = page.getByRole('link', { name: 'Inicio' });
    this.cantidadDeProductosEnCarrito =  page.getByLabel('cart').locator('.badge');
    this.CarritoButton = page.getByLabel('cart');
    this.UsuarioNombre = page.locator('.nav-link-dropdown-toggle-btn-link-style')

  }

  async BuscarUnProducto(productName: string) {
    await this.searchInput.fill(productName);
    await this.BuscarButton.click();
    await this.page.waitForTimeout(2000);

  }
  async AgregarProductoAlCarrito() {
     const products = await this.productos; // selecciona todos los elementos que tienen la clase "card"
       const productCount = await products.count(); // cuenta cuántos elementos hay
       console.log(`Se encontraron ${productCount} productos`); // muestra el número de productos encontrados

       if (productCount > 0) { // si hay al menos un producto, selecciona uno al azar y hace clic en él
         const randomIndex = Math.floor(Math.random() * productCount); // genera un índice aleatorio entre 0 y productCount - 1
         await products.nth(randomIndex).click();
         await this.AgregarAlCarritoButton.click(); // hace clic en el producto seleccionado
         await this.page.waitForTimeout(2000); // espera 2 segundos para que se procese la acción
         await expect(this.MensajeProductoAgregado).toBeVisible(); // espera a que aparezca el mensaje de producto agregado al carrito
         await this.InicioLink.click(); // vuelve a la página de inicio
         await this.BuscarUnProducto('Hammer'); // busca el producto "Hammer" nuevamente
       } else {
         throw new Error('No se encontraron productos con el nombre "Hammer".'); // si no hay productos con ese nombre, lanza un error
       }

  }

  async AgregarMasProductosAlCarrito(cantidad: number) {
    for (let i = 0; i < cantidad; i++) {
      await this.AgregarProductoAlCarrito();
      await this.page.waitForTimeout(1000); // espera 1 segundo entre cada adición al carrito
    }
  }

  }