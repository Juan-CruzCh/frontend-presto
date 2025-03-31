export interface PagoData {
  codigoCliente: string;
  numeroMedidor: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  categoria: string;
  fecha: string;
  mes: string;
  lecturaActual: number;
  lecturaAnterior: number;
  consumoTotal: number;
  costoApagar: number;
  ci: string;
  estado: string;
  estadoPago: string;
  costoPagado: number;
}
