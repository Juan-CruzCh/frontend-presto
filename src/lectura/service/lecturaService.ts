import { instance } from "../../config/instance";
import { ParamsI } from "../../core/interface/params";
import { response } from "../../core/interface/response";
import { ResponseDataI } from "../../core/interface/responseData";
import { ResponseOneI } from "../../core/interface/responseOne";
import { BuscadorLecturaI } from "../interface/buscadorLectura";

import { FormLecturaI } from "../interface/formLectura";
import { LecturaMedidorI } from "../interface/lecturaMedidor";
import { ListarLecturaI } from "../interface/listarLecturas";
import { ResponseReciboData } from "../interface/reciboData";

import { ResponseLecturaI } from "../interface/responseLectura";

export const crearLectura = async (
  data: FormLecturaI
): Promise<ResponseLecturaI> => {
  try {
    const response = await instance.post("lectura", data);
    return await response.data;
  } catch (error) {
    throw error;
  }
};

export const lecturaRecibo = async (
  medidor: string,
  lectura: string
): Promise<ResponseReciboData> => {
  try {
    const response = await instance.get(
      `lectura/recibo/${medidor}/${lectura} `
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const lecturaMedidor = async (
  medidor: string
): Promise<LecturaMedidorI[]> => {
  try {
    const response = await instance.get(`lectura/medidor/${medidor}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarLecturas = async (
  limite: number,
  pagina: number,
  buscadorLecturaI: BuscadorLecturaI
): Promise<ResponseDataI<ListarLecturaI>> => {
  const params: ParamsI & BuscadorLecturaI = {
    limite: limite,
    pagina: pagina,
  };
  buscadorLecturaI.numeroMedidor
    ? (params.numeroMedidor = buscadorLecturaI.numeroMedidor)
    : params;

  buscadorLecturaI.estado ? (params.estado = buscadorLecturaI.estado) : params;

  buscadorLecturaI.fechaInicio
    ? (params.fechaInicio = buscadorLecturaI.fechaInicio)
    : params;

  buscadorLecturaI.fechaFin
    ? (params.fechaFin = buscadorLecturaI.fechaFin)
    : params;
  try {
    const response = await instance.get(`lectura`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const lecturaId = async (
  lectura: string
): Promise<ResponseOneI<FormLecturaI>> => {
  try {
    const response = await instance.get(`lectura/${lectura}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarLectura = async (
  lectura: string,
  data: FormLecturaI
): Promise<response> => {
  try {
    const response = await instance.patch(`lectura/${lectura}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarLectura = async (lectura: string): Promise<response> => {
  try {
    const response = await instance.delete(`lectura/${lectura}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
