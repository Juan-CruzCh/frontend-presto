import { HttpStatus } from "../../core/enums/httpStatus";

export interface ResponsePagoRealizadoI {
  status: HttpStatus;
  medidor: string;
}
