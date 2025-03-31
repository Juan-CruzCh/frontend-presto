import { RouterI } from "../../core/interface/router";
import { CorteMedidorPage } from "../page/CorteMedidorPage";
import CrearMedidorPage from "../page/CrearMedidorPage";
import { MedidorPage } from "../page/MedidorPage";

export const medidorRouter: RouterI[] = [
  {
    path: "/medidor",
    element: MedidorPage,
  },
  {
    path: "/medidor/crear",
    element: CrearMedidorPage,
  },

  {
    path: "/listar/corte/medidor",
    element: CorteMedidorPage,
  },
];
