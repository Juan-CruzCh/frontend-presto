import { HttpStatus } from "../../core/enums/httpStatus";

export interface ResponseLecturaI {
  status: HttpStatus;
  lectura: string;
  medidor: string;
}
