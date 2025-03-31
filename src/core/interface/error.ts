import { HttpStatus } from "../enums/httpStatus";

export interface ErrorI {
  error: string;
  message: string;
  statusCode: HttpStatus;
  propiedad: string;
}
