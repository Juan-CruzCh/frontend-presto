export interface ListarPagosI {
  _id: string;
  codigoCliente: string;
  ci: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  codigoMedidor: string;
  numeroMedidor: string;
  lecturaActual: number;
  lecturaAnterior: number;
  consumoTotal: number;
  costoApagar: number;
  mes: string;
  costoPagado: number;
  fecha: string;
  numeroPago: string;
  estado: string;
  tarifa: string;
  medidor:string
}
