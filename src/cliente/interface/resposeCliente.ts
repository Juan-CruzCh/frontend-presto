import { HttpStatus } from "../../core/enums/httpStatus";
import { ClienteI } from "./cliente";

export interface ResponseClienteI {
    status:HttpStatus,
    cliente:ClienteI
}