import { HttpStatus } from "../enums/httpStatus"

export interface ErrorConflictoI {
    error:string,
    message:string
    statusCode:HttpStatus

}