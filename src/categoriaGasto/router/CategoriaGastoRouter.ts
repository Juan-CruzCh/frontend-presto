import { RouterI } from "../../core/interface/router";
import { CategoriaGastoPage } from "../page/CategoriaGastoPage";

export const categoriaGastoRouter:RouterI[]=[
    {
        element:CategoriaGastoPage,
        path:'/categorias/gasto'
    }
]