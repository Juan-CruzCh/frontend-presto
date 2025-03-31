import { RouterI } from "../../core/interface/router";
import { AutenticacionPage } from "../page/AutenticacionPage";

export const autenticacionRouter: RouterI[] = [
  {
    path: "/",
    element: AutenticacionPage,
  },
];
