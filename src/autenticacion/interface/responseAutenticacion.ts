import { HttpStatus } from "../../core/enums/httpStatus";

export interface ResponseAutenticacionI {
  status: HttpStatus;
  token: string;
}
