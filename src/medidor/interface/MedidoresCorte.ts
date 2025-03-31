export interface LecturaPendienteI {
  _id: string;
  codigo: string;
  consumoTotal: number;
  costoApagar: number;
  estado: string;
  fecha: string;
  fechaVencimiento: string;
  flag: string;
  gestion: string;
  lecturaActual: number;
  lecturaAnterior: number;
  medidor: string;
  mes: string;
  numeroLectura: string;
  usuario: string;
}

export interface MedidorCorteI {
  _id: string;
  codigo: string;
  estado: string;
  direccion: string;
  numeroMedidor: string;
  lecturas: LecturaPendienteI[];
}
