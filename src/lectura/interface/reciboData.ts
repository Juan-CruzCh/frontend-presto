import { HttpStatus } from "../../core/enums/httpStatus";

export interface ReciboDataI {
  _id: string;
  numeroMedidor: string;
  ci: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  direccion: string;
  codigoCliente: string;
  tarifaNombre?: string;
}

export interface LecturasReciboI {
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

  _id: string;
}

export interface ResponseReciboData {
  status: HttpStatus;
  data: {
    dataCliente: ReciboDataI;
    lecturas: LecturasReciboI[];
    lectura: LecturasReciboI;
  };
}
