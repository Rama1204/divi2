import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContadorService {
  private contadorSubject: BehaviorSubject<number>;
  contador$: Observable<number>;

  constructor() {
    const saldo = localStorage.getItem('saldo');
    this.contadorSubject = new BehaviorSubject<number>(saldo ? JSON.parse(saldo) : 0);
    this.contador$ = this.contadorSubject.asObservable();
  }

  obtenerContador(): number {
    return this.contadorSubject.value;
  }

  aumentarContador(cantidad: number): void {
    const contadorActual = this.contadorSubject.value + cantidad;
    this.actualizarAlmacenamiento(contadorActual);
  }

  disminuirContador(cantidad: number): void {
    if (this.contadorSubject.value >= cantidad) {
      const contadorActual = this.contadorSubject.value - cantidad;
      this.actualizarAlmacenamiento(contadorActual);
    }
  }

  private actualizarAlmacenamiento(valor: number): void {
    this.contadorSubject.next(valor);
    localStorage.setItem('saldo', JSON.stringify(valor));
  }
}