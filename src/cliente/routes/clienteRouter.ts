import { RouterI } from "../../core/interface/router";
import { ClientePage } from "../page/ClientePage";

export const clienteRouter: RouterI[] = [
  {
    path: "/clientes",
    element: ClientePage,
  },
];
