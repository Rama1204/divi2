import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContadorService } from '../core/services/contador.service';
import { moneda } from '../core/interfaces/moneda';
import { ConversorService } from '../core/services/conversor.service';
import { ToastController } from '@ionic/angular';
import { HistorialService } from '../core/services/historial.service'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
disminuirContador(arg0: number) {
throw new Error('Method not implemented.');
}
  contador: number = 0;
  monto: number | null = null;
  monedaOrigen!: moneda;
  monedaDestino!: moneda;
  resultado: string = '';
  simboloMonedaDestino: string = ''; 

  monedasOrigen: moneda[] = [];
  monedasDestino: moneda[] = [];

  private contadorSubscription: Subscription = new Subscription();

  constructor(
    private conversorService: ConversorService,
    private contadorService: ContadorService,
    private toastController: ToastController,
    private historialService: HistorialService
  ) {
    this.actualizarContador();

    this.contadorSubscription = this.contadorService.contador$.subscribe(nuevoContador => {
      this.contador = nuevoContador;
    });
  }

  ngOnDestroy() {
    this.contadorSubscription.unsubscribe();
  }

  ngOnInit() {
    this.actualizarContador();
    this.cargarMonedas();
    this.monto = null;
  }

  actualizarContador() {
    this.contador = this.contadorService.obtenerContador();
  }

  cargarMonedas() {
    this.monedasOrigen = this.conversorService.obtenerMonedas();
    this.monedasDestino = this.conversorService.obtenerMonedas();
  }

  realizarConversion() {
    if (this.contador > 0 && this.monto && this.monedaOrigen && this.monedaDestino) {
      const resultadoNumerico = this.conversorService.convertir(this.monto, this.monedaOrigen, this.monedaDestino);
      this.resultado = resultadoNumerico.toFixed(2); 
      this.simboloMonedaDestino = this.monedaDestino.simbolo; 
      this.contadorService.disminuirContador(1);
      this.actualizarContador();

      const conversion = {
        monto: this.monto,
        monedaOrigen: this.monedaOrigen,
        monedaDestino: this.monedaDestino,
        resultado: this.resultado,
        fecha: new Date(), 
        montoConvertido: resultadoNumerico,
        simboloMonedaDestino: this.simboloMonedaDestino, 
      };
      this.historialService.agregarConversion(conversion); 
    } else if (this.contador > 0) {
      this.mostrarAlertaFaltanDatos();
    } else {
      this.resultado = '';
      this.mostrarAlertaSaldoInsuficiente();
    }
  }

  async mostrarAlertaSaldoInsuficiente() {
    const toast = await this.toastController.create({
      message: 'Saldo insuficiente.',
      duration: 2500,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }

  async mostrarAlertaFaltanDatos() {
    const toast = await this.toastController.create({
      message: 'Faltan datos obligatorios.',
      duration: 2500,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }
}