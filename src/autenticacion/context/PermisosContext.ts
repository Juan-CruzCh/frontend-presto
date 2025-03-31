import { createContext } from "react";
import { PermisosI } from "../interface/permisos";

export const PermisosContext = createContext<PermisosI>({
  permisosGasto: [],
  permisosLectura: [],
  permisosPago: [],
  permisosRol: [],
  permisosUsuario: [],
  permisosTarifa: [],
  permisosMedidor: [],
  permisosCliente: [],
});
