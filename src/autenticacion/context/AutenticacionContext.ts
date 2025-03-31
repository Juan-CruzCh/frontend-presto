import { createContext } from "react";
import { AutenticacionContextI } from "../interface/autenticacionContext";

export const AutenticacionContext = createContext<AutenticacionContextI>({
  token: "",
  isAutenticacion: true,
  setToken() {},
  cerrarSession() {},
});
