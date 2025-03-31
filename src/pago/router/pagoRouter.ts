import { RouterI } from "../../core/interface/router";
import { ReciboPagoClientePage } from "../page/ReciboPagoClientePage";
import { RealizarPagoPage } from "../page/RealizarPagoPage";
import { ListarPagoPage } from "../page/ListarPagoPage";

export const pagoRouter: RouterI[] = [
  {
    path: "/realizar/pago",

    element: RealizarPagoPage,
  },

  {
    path: "/pago/imprimir/cliente/:medidor",

    element: ReciboPagoClientePage,
  },

  {
    path: "/listar/Pagos",

    element: ListarPagoPage,
  },
];
