import { Injectable } from '@angular/core';
import { Conversion } from '../interfaces/conversion';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private historial: Conversion[] = [];

  constructor() {
    const storedHistorial = localStorage.getItem('historial');
    this.historial = storedHistorial ? JSON.parse(storedHistorial) : [];
  }

  agregarConversion(conversion: Conversion) {
    this.historial.push(conversion);
    this.actualizarLocalStorage();
  }

  obtenerHistorial(): Conversion[] {
    return this.historial;
  }
  vaciarHistorial() {
    this.historial = [];
    this.actualizarLocalStorage();
  }

  private actualizarLocalStorage() {
    localStorage.setItem('historial', JSON.stringify(this.historial));
  }
}