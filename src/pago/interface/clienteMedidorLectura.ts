export interface ClienteMedidorLecturaI {
  // Datos del cliente
  idCliente: string;
  ci: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  codigo: string;
  celular: string;
  nombre: string;

  // Datos del medidor
  idMedidor: string;
  estado: string;
  numeroMedidor: string; // O number, según tu modelo
  tarifa: string;

  // Datos de la lectura
  idLectura: string;
  consumoTotal: number;
  costoApagar: number;
  codigolectura: string;
  lecturaActual: number;
  lecturaAnterior: number;
  medidor: string;
  mes: string;
  numeroLectura: number;
}
