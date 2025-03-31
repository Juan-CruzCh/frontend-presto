import { instance } from "../../config/instance";
import { ParamsI } from "../../core/interface/params";
import { response } from "../../core/interface/response";
import { ResponseDataI } from "../../core/interface/responseData";
import { ResponseOneI } from "../../core/interface/responseOne";
import { BuscadorGastoI } from "../interface/BuscadorGasto";
import { FormGastoI } from "../interface/formGasto";
import { GastoI } from "../interface/gasto";

export const crearGasto = async (data: FormGastoI): Promise<response> => {
  try {
    const response = await instance.post("gasto", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarGastos = async (
  limite: number,
  pagina: number,
  buscador: BuscadorGastoI
): Promise<ResponseDataI<GastoI>> => {
  try {
    const params: ParamsI & BuscadorGastoI = {
      limite: limite,
      pagina: pagina,
    };
    buscador.categoriaGasto
      ? (params.categoriaGasto = buscador.categoriaGasto)
      : params;

    buscador.fechaInicio ? (params.fechaInicio = buscador.fechaInicio) : params;
    buscador.fechaFin ? (params.fechaFin = buscador.fechaFin) : params;

    const response = await instance.get("gasto", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarGasto = async (id: string): Promise<response> => {
  try {
    const response = await instance.delete(`gasto/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const gastoOne = async (
  id: string
): Promise<ResponseOneI<FormGastoI>> => {
  try {
    const response = await instance.get(`gasto/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarGasto = async (
  data: FormGastoI,
  gasto: string
): Promise<response> => {
  try {
    const response = await instance.patch(`gasto/${gasto}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const descargarGastoExcel = async (
  buscador: BuscadorGastoI
): Promise<MediaSource> => {
  try {
    const params: BuscadorGastoI = {};
    buscador.categoriaGasto
      ? (params.categoriaGasto = buscador.categoriaGasto)
      : params;

    buscador.fechaInicio ? (params.fechaInicio = buscador.fechaInicio) : params;
    buscador.fechaFin ? (params.fechaFin = buscador.fechaFin) : params;

    const response = await instance.get("gasto/descargar/Excel", {
      params,
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
