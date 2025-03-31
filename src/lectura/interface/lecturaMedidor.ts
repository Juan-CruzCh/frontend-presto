export interface LecturaMedidorI {
  _id: string;
  lecturaActual: number;

  lecturaAnterior: number;

  medidor: string;

  codigo: string;

  consumoTotal: number;

  mes: string;

  numeroLectura: number;

  costoApagar: number;

  estado: string;
}
