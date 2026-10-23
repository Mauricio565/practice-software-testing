import {Locator, Page} from "@playwright/test";


export default class DireccionItems {
    readonly page: Page;
    readonly desplegablePais: Locator;
    readonly codigoPostalInput: Locator;
    readonly NumeroInput: Locator;
    readonly CalleInput: Locator;
    readonly CiudadInput: Locator;
    readonly EstadoInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.desplegablePais = page.getByLabel('País');
        this.codigoPostalInput = page.getByLabel('Código postal')
        this.NumeroInput = page.getByLabel('Número')
        this.CalleInput = page.getByLabel('Calle')
        this.CiudadInput = page.getByLabel('Ciudad')
        this.EstadoInput = page.getByLabel('Estado')
    }
    async completarDireccion ( codigoPostal: string, numero: string, calle: string, ciudad: string, estado: string) {
        await this.desplegablePais.selectOption({ label: 'Argentina' });
        await this.codigoPostalInput.fill(codigoPostal);
        await this.NumeroInput.fill(numero);
        await this.CalleInput.fill(calle);
        await this.CiudadInput.fill(ciudad);
        await this.EstadoInput.fill(estado);
    }
}