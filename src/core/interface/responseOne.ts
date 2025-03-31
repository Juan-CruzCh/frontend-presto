import { HttpStatus } from "../enums/httpStatus";

export interface ResponseOneI<T> {
  status: HttpStatus;
  data: T;
}
