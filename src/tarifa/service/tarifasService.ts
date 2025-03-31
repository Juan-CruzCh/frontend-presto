import { instance } from "../../config/instance";
import { response } from "../../core/interface/response";
import { DataI } from "../interface/data";
import { TarifaI } from "../interface/tarifa";
import { RangoI } from "../interface/rango";
import { ResponseOneI } from "../../core/interface/responseOne";
import { EditarRangoI } from "../interface/editarRango";

export const crearTarifa = async (data: DataI): Promise<response> => {
  try {
    console.log(data);

    const response = await instance.post("tarifa", data);
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const listarTarifas = async (): Promise<TarifaI[]> => {
  try {
    const response = await instance.get("tarifa");
    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const listarRangoTarifa = async (tarifa: string): Promise<RangoI[]> => {
  try {
    const response = await instance.get(`rango/${tarifa}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const tarifaPorId = async (
  tarifa: string
): Promise<ResponseOneI<{ nombre: string }>> => {
  try {
    const response = await instance.get(`tarifa/${tarifa}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarTarifa = async (
  tarifa: string,
  nombre: string
): Promise<response> => {
  try {
    const response = await instance.patch(`tarifa/${tarifa}`, {
      nombre: nombre,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rangoPorId = async (
  id: string
): Promise<ResponseOneI<EditarRangoI>> => {
  try {
    const response = await instance.get(`rango/id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarRango = async (
  id: string,
  data: EditarRangoI
): Promise<response> => {
  try {
    const response = await instance.patch(`rango/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarTarifa = async (id: string): Promise<response> => {
  try {
    const response = await instance.delete(`tarifa/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarRango = async (id: string): Promise<response> => {
  try {
    const response = await instance.delete(`rango/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
