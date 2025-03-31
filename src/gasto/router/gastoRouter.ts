import { RouterI } from "../../core/interface/router";
import {GastoPage} from '../page/GastoPage'

export const gastoRouter:RouterI[] =[
    {
        path:'/gastos',
        element:GastoPage
    }
]  