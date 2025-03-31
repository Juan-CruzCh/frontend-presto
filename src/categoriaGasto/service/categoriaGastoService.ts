import { instance } from "../../config/instance";
import { ParamsI } from "../../core/interface/params";
import { response } from "../../core/interface/response";
import { ResponseDataI } from "../../core/interface/responseData";
import { ResponseOneI } from "../../core/interface/responseOne";
import { CategoriaGastoI } from "../interface/categoriaGasto";
import { FormCategoriaGastoI } from "../interface/formCategoriaGasto";

export const crearCategoriaGasto = async (
  data: FormCategoriaGastoI
): Promise<response> => {
  try {
    const response = await instance.post("categoria/gasto", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarCategoriaGasto = async (
  limite: number,
  pagina: number
): Promise<ResponseDataI<CategoriaGastoI>> => {
  try {
    const params: ParamsI = {
      limite: limite,
      pagina: pagina,
    };
    const response = await instance.get("categoria/gasto", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarCategoriaGastoPublico = async (): Promise<
  CategoriaGastoI[]
> => {
  try {
    const response = await instance.get("categoria/gasto/publico");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarCategoria = async (id: string): Promise<response> => {
  try {
    const response = await instance.delete(`categoria/gasto/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const categoriaGastoOne = async (
  id: string
): Promise<ResponseOneI<FormCategoriaGastoI>> => {
  try {
    const response = await instance.get(`categoria/gasto/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarCategoriaGasto = async (
  data: FormCategoriaGastoI,
  id: string
): Promise<response> => {
  try {
    const response = await instance.patch(`categoria/gasto/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
