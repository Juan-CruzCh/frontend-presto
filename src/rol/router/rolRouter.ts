import { RouterI } from "../../core/interface/router";

import { CrearRolPage } from "../page/CrearRolPage";
import { EditarRolPage } from "../page/EditarRolPage";
import { ListarRolPage } from "../page/ListarRolPage";

export const rolRouter: RouterI[] = [
  {
    path: "/listar/rol",

    element: ListarRolPage,
  },
  {
    path: "/crear/rol",

    element: CrearRolPage,
  },
  {
    path: "/editar/rol/:id",

    element: EditarRolPage,
  },
];
