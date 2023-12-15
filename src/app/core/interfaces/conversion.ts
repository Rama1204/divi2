import { moneda } from './moneda';

export interface Conversion {
monto: number;
  id?: number;
  monedaOrigen: moneda;
  monedaDestino: moneda;
  montoConvertido?: number;
  resultado: number | string;
  simboloMonedaDestino: string;
  fecha?: Date;
}