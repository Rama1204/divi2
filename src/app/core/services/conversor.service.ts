import { Injectable } from '@angular/core';
import { moneda } from '../interfaces/moneda';
import { ContadorService } from './contador.service';

@Injectable({
  providedIn: 'root'
})
export class ConversorService { private monedas: moneda[] = [
  { nombre: 'Peso Argentino', valor: 1, simbolo: "$ARS", imagenUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpg_J8Jc2UKOOX-otLyHtD1i5cfTLhBqGqbA&usqp=CAU" },
  { nombre: 'Euro', simbolo: '€', imagenUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/255px-Flag_of_Europe.svg.png', valor: 1050 },
  { nombre: 'Dólar estadounidense', simbolo: '$USD', imagenUrl:"https://qph.cf2.quoracdn.net/main-qimg-5aa649e7ccb84ab9f53fdfce879e4bf0-lq", valor: 980 },
  { nombre: 'Real', simbolo: 'R$', imagenUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThS6AzmxPPYnxVpQDri-6pVvPlLtF3NT3edQ&usqp=CAU", valor: 201.75 },
  { nombre: 'Libra Esterlina', simbolo: '£', imagenUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCVcCoqeBYIvpuddWHLC76t8pPEYS6I0HVzg&usqp=CAU', valor: 1210 },];
   
convertir(cantidad: number,  monedaOrigen: moneda, monedaDestino: moneda): number {
  const cantidadEnPesos = cantidad * monedaOrigen.valor;
    const resultado = cantidadEnPesos / monedaDestino.valor;
    return resultado;
  }

obtenerMonedas(): moneda[] {
  return this.monedas;
}

}