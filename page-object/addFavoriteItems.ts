import {Locator,Expect, Page, expect} from "@playwright/test";
import LoginPage from "./login";
import AddCardItems from "./addCardItems";

let login: LoginPage;
let addCardItems: AddCardItems;

export default class AddFavoriteItems {
  readonly page: Page;
  readonly AñadirAFavoritosButton: Locator;
  readonly MensajeProductoAgregadoAFavoritos: Locator;
  readonly UsuarioLink: Locator;
  readonly SeccionFavoritosLink: Locator;
  readonly productosFavoritos: Locator;
  readonly productos: Locator;
  readonly InicioLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.AñadirAFavoritosButton = page.getByRole('button', { name: 'Añadir a favoritos' });
    this.MensajeProductoAgregadoAFavoritos = page.getByRole('alert', { name: 'Producto añadido a favoritos' });
    this.UsuarioLink = page.getByRole('button', { name: 'Jane Doe' });
    this.SeccionFavoritosLink = page.getByRole('link', { name: 'Mis favoritos' });
    this.productosFavoritos = page.locator('.col');
    this.productos = page.locator('[data-test="search_completed"] a.card');
    this.InicioLink = page.getByRole('link', { name: 'Inicio' });
  }

   async AgregarProductoAFavoritos() {
    addCardItems = new AddCardItems(this.page);
    const products = await this.productos; // selecciona todos los elementos que tienen la clase "card"
       const productCount = await products.count(); // cuenta cuántos elementos hay
       console.log(`Se encontraron ${productCount} productos`); // muestra el número de productos encontrados

       if (productCount > 0) { // si hay al menos un producto, selecciona uno al azar y hace clic en él
         const randomIndex = Math.floor(Math.random() * productCount); // genera un índice aleatorio entre 0 y productCount - 1
         const productoSeleccionado = this.productos.nth(randomIndex); // selecciona el producto al azar
         const productTitle = (
            await productoSeleccionado.locator('.card-title').innerText()).trim(); // obtiene el título del producto seleccionado y elimina los espacios en blanco al inicio y al final
            console.log(`Producto seleccionado: ${productTitle}`);// muestra el título del producto seleccionado
         await productoSeleccionado.click(); // hace clic en el producto seleccionado
         await this.AñadirAFavoritosButton.click(); // hace clic en el botón "Añadir a favoritos"
         await this.page.waitForTimeout(2000); // espera 2 segundos para que se procese la acción
         await expect(this.MensajeProductoAgregadoAFavoritos).toBeVisible(); // espera a que aparezca el mensaje de producto agregado a favoritos
         await this.InicioLink.click(); // vuelve a la página de inicio
         await addCardItems.BuscarUnProducto('Hammer'); // busca el producto "Hammer" nuevamente
         } else {
         throw new Error('No se encontraron productos con el nombre "Hammer".'); // si no hay productos con ese nombre, lanza un error
       }
         //await this.UsuarioLink.click(); // hace clic en el enlace del usuario para abrir el menú desplegable
         //await this.SeccionFavoritosLink.click(); // hace clic en el enlace de la sección de favoritos
  
}
   async AgregarMasProductosAFavoritos(cantidad: number) {
    for (let i = 0; i < cantidad; i++) {
      await this.AgregarProductoAFavoritos(); // llama a la función AgregarProductoAFavoritos() para agregar un producto a favoritos
      await this.page.waitForTimeout(1000); // espera 1 segundo entre cada adición a favoritos
    }
  }

}