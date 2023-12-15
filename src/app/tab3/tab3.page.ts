import { Component } from '@angular/core';
import { ContadorService } from '../core/services/contador.service';
import { HistorialService } from '../core/services/historial.service';
import { Conversion } from '../core/interfaces/conversion';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  contador: number = 0;
  historial: Conversion[] = [];
  montoConvertido: number | undefined;

  constructor(
    private contadorService: ContadorService,
    private historialService: HistorialService
  ) {}

  ionViewWillEnter() {
    this.actualizarContador();
    this.obtenerHistorial();
  }

  actualizarContador() {
    this.contador = this.contadorService.obtenerContador();
  }

  obtenerHistorial() {
    this.historial = this.historialService.obtenerHistorial();
    this.historial.reverse();
  }
  vaciarHistorial() {
    this.historialService.vaciarHistorial();
    this.obtenerHistorial(); 
  }
}
