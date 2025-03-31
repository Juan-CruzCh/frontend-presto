import { instance } from "../../config/instance";
import { ParamsI } from "../../core/interface/params";
import { response } from "../../core/interface/response";
import { ResponseDataI } from "../../core/interface/responseData";
import { ResponseOneI } from "../../core/interface/responseOne";
import { DataClienteI } from "../../lectura/interface/dataCliente";
import { BuscadorMedidorClientI } from "../interface/buscadorMedidorCliente";
import { DataMedidorClienteI } from "../interface/dataMedidorCliente";
import { FormMedidorI } from "../interface/formMedidor";
import { MedidorCliente } from "../interface/medidorCliente";
import { MedidorCorteI } from "../interface/MedidoresCorte";

export const crearMedidor = async (data: FormMedidorI): Promise<response> => {
  try {
    const response = await instance.post("medidor", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const buscarMedidor = async (
  numeroMedidor: string
): Promise<DataClienteI> => {
  try {
    const response = await instance.get(`medidor/buscar/${numeroMedidor}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarMedidor = async (
  buscador: BuscadorMedidorClientI,
  limite: number,
  pagina: number
): Promise<ResponseDataI<MedidorCliente>> => {
  try {
    const params: ParamsI & BuscadorMedidorClientI = {
      limite: limite,
      pagina: pagina,
    };
    buscador.ci ? (params.ci = buscador.ci) : params;
    buscador.nombre ? (params.nombre = buscador.nombre) : params;
    buscador.apellidoPaterno
      ? (params.apellidoPaterno = buscador.apellidoPaterno)
      : params;
    buscador.apellidoMaterno
      ? (params.apellidoMaterno = buscador.apellidoMaterno)
      : params;
    buscador.numeroMedidor
      ? (params.numeroMedidor = buscador.numeroMedidor)
      : params;

    buscador.estado ? (params.estado = buscador.estado) : params;

    const response = await instance.get("medidor", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const medidorCliente = async (
  cliente: string
): Promise<DataMedidorClienteI[]> => {
  try {
    const response = await instance.get(`medidor/cliente/${cliente}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const medidorFindOne = async (
  medidor: string
): Promise<ResponseOneI<FormMedidorI>> => {
  try {
    const response = await instance.get(`medidor/${medidor}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarMedidor = async (
  id: string,
  data: FormMedidorI
): Promise<response> => {
  try {
    const response = await instance.patch(`medidor/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarMedidor = async (id: string): Promise<response> => {
  try {
    const response = await instance.delete(`medidor/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarMedidoresConTresLecturasPendientes = async (
  limite: number,
  pagina: number
): Promise<ResponseDataI<MedidorCorteI>> => {
  const params: ParamsI = {
    limite: limite,
    pagina: pagina,
  };
  try {
    const response = await instance.get("medidor/tres/lecturas/pendientes", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const realizarCorte = async (id: string): Promise<response> => {
  try {
    const response = await instance.patch(`medidor/corte/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const descargarExcelMedidoresConTresLecturasPendientes =
  async (): Promise<MediaSource> => {
    try {
      const response = await instance.get(
        "medidor/descragar/excel/tres/lecturas/pendientes",
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
