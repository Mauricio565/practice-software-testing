import {Page, Locator} from "@playwright/test";

export default class Pago {
    readonly page: Page;
    readonly verificarPagoButton:Locator;
    readonly pagoInput: Locator;
    readonly nombreDelBanco:Locator;
    readonly nombreCuenta: Locator;
    readonly numeroCuenta: Locator;
    readonly ConfirmarButton: Locator;
    readonly mensajeDeCompraExitosa: Locator;

    readonly numeroTarjetaDeCreditoInput: Locator;
    readonly fechaDeExpiracionInput: Locator;
    readonly cvvInput: Locator;
    readonly nombreTitularTarjetaInput: Locator;

    readonly cuotasMensualesInput: Locator;

    readonly numeroTarjetaDeregaloInput: Locator;
    readonly codigoValidacionInput: Locator;
    


    constructor (page: Page){
        this.page=page;
        this.verificarPagoButton= page.getByRole('button', {name: 'Verificar pago'});
        this.pagoInput= page.getByLabel('Método de pago');
        this.nombreDelBanco=page.getByPlaceholder('Nombre del banco');
        this.nombreCuenta=page.getByPlaceholder('Nombre de la cuenta');
        this.numeroCuenta=page.getByPlaceholder('Account Number');
        this.ConfirmarButton=page.getByRole('button', {name: 'Confirmar'});
        this.mensajeDeCompraExitosa= page.locator('.row').nth(3);

        this.numeroTarjetaDeCreditoInput=page.getByLabel('Número de tarjeta de crédito');
        this.fechaDeExpiracionInput=page.getByLabel('Fecha de vencimiento');
        this.cvvInput=page.getByLabel('CVV');
        this.nombreTitularTarjetaInput=page.getByLabel('Nombre del titular de la tarjeta');

        this.cuotasMensualesInput=page.getByLabel('Cuotas mensuales');
        
        this.numeroTarjetaDeregaloInput=page.getByLabel('Número de tarjeta de regalo');
        this.codigoValidacionInput=page.getByLabel('Código de validación');


        
        

    }
    async pagoTransferenciaBancaria ( nombreBanco: string, nombreCuenta: string, numeroCuenta: string){
        await this.pagoInput.selectOption({ label: 'Transferencia bancaria' });
        await this.nombreDelBanco.fill(nombreBanco);
        await this.nombreCuenta.fill(nombreCuenta);
        await this.numeroCuenta.fill(numeroCuenta);
        await this.verificarPagoButton.click();
        }

    async pagoTarjetaDeCredito (numeroTarjetaDeCredito: string, fechaDeExpiracion: string, cvv: string, nombreTitularTarjeta: string){
        await this.pagoInput.selectOption({ label: 'Tarjeta de crédito' });
        await this.numeroTarjetaDeCreditoInput.fill(numeroTarjetaDeCredito);
        await this.fechaDeExpiracionInput.fill(fechaDeExpiracion);
        await this.cvvInput.fill(cvv);
        await this.nombreTitularTarjetaInput.fill(nombreTitularTarjeta);
        await this.verificarPagoButton.click();
        }

     async pagoPagoAhoraPagaDespues (){
        await this.pagoInput.selectOption({ label: 'Compra ahora, paga después' });
        await this.cuotasMensualesInput.selectOption({label: '6 Cuotas mensuales'});
        await this.verificarPagoButton.click();
     }   

     async pagoTarjetaDeRegalo(numeroTarjetaDeRegalo: string, codigoValidacion: string){
        await this.pagoInput.selectOption({ label: 'Tarjeta de regalo' });
        await this.numeroTarjetaDeregaloInput.fill(numeroTarjetaDeRegalo);
        await this.codigoValidacionInput.fill(codigoValidacion);
        await this.verificarPagoButton.click();


     }

}

   