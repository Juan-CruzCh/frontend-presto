import { RouterI } from "../../core/interface/router";
import { ListarUsuariosPage } from "../page/ListarUsuariosPage";

export const usuarioRouter: RouterI[] = [
  {
    path: "/listar/usuarios",

    element: ListarUsuariosPage,
  },
];
