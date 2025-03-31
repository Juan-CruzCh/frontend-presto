import { HttpStatus } from "../enums/httpStatus";

export interface ResponseDataI<T> {
  status: HttpStatus;
  paginas: number;
  data: T[];
}
