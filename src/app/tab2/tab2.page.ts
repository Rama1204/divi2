import { Component, OnDestroy } from '@angular/core';
import { ContadorService } from '../core/services/contador.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnDestroy {
  alertButtons = ['Comprar'];
  contador: number = 0;
  contadorSubscription: Subscription;

  constructor(private contadorService: ContadorService) {
    this.actualizarContador();

    this.contadorSubscription = this.contadorService.contador$.subscribe(contador => {
      this.contador = contador;
    });
  }

  oferta1() {
    this.contadorService.aumentarContador(1);
    this.actualizarContador();
  }

  oferta2() {
    this.contadorService.aumentarContador(10);
    this.actualizarContador();
  }

  oferta3() {
    this.contadorService.aumentarContador(25);
    this.actualizarContador();
  }

  oferta4() {
    this.contadorService.aumentarContador(50);
    this.actualizarContador();
  }

  actualizarContador() {
    this.contador = this.contadorService.obtenerContador();
  }

  ngOnDestroy() {
    this.contadorSubscription.unsubscribe();
  }
}