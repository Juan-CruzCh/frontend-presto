import { RouterI } from "../../core/interface/router";
import { HomePage } from "../page/HomePage";

export const homeRouter: RouterI[] = [
  {
    path: "/",

    element: HomePage,
  },
];
