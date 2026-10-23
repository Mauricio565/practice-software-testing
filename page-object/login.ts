import {Locator, expect, Page} from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly IniciarSesionLink: Locator;
  readonly CorreoElectronicoInput: Locator;
  readonly ContraseñaInput: Locator;
  readonly BotonIniciarSesion: Locator;

  constructor(page: Page) {
    this.page = page;
    this.IniciarSesionLink = this.page.getByRole('link', { name: 'Iniciar sesión' });
    this.CorreoElectronicoInput = this.page.getByPlaceholder('Tu correo electrónico');
    this.ContraseñaInput = this.page.getByPlaceholder('Tu contraseña');
    this.BotonIniciarSesion = this.page.getByRole('button', { name: 'Login' });


  }
  async login(correoElectronico: string, contraseña: string) {
    await this.CorreoElectronicoInput.type(correoElectronico);
    await this.ContraseñaInput.type(contraseña);
    await this.BotonIniciarSesion.click();
    await this.page.waitForTimeout(2000); // espera 3 segundos para que se procese la acción


}
  }
