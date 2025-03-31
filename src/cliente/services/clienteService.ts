import { instance } from "../../config/instance";
import { ParamsI } from "../../core/interface/params";
import { response } from "../../core/interface/response";
import { ResponseDataI } from "../../core/interface/responseData";
import { ResponseOneI } from "../../core/interface/responseOne";
import { BuscadorClienteI } from "../interface/buscadorCliente";

import { ClienteI } from "../interface/cliente";
import { FormClienteI } from "../interface/formCliente";

import { ResponseClienteI } from "../interface/resposeCliente";

export const listarClientes = async (
  limite: number,
  pagina: number,
  codigo: string,
  ci: string,
  apellidoMaterno: string,
  apellidoPaterno: string,
  nombre: string
): Promise<ResponseDataI<ClienteI>> => {
  try {
    const params: ParamsI & BuscadorClienteI = {
      limite: limite,
      pagina: pagina,
    };
    codigo ? (params.codigo = codigo) : params;
    ci ? (params.ci = ci) : params;
    nombre ? (params.nombre = nombre) : params;
    apellidoMaterno ? (params.apellidoMaterno = apellidoMaterno) : params;
    apellidoPaterno ? (params.apellidoPaterno = apellidoPaterno) : params;
    console.log(params);

    const response = await instance.get("cliente", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const crearCliente = async (
  data: FormClienteI
): Promise<ResponseClienteI> => {
  try {
    const response = await instance.post("cliente", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const buscarCliente = async (codigo: string): Promise<ClienteI> => {
  try {
    const response = await instance.get("cliente", {
      params: {
        codigo: codigo,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const clienteId = async (
  id: string
): Promise<ResponseOneI<FormClienteI>> => {
  try {
    const response = await instance.get(`cliente/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarCliente = async (
  id: string,
  data: FormClienteI
): Promise<ResponseOneI<FormClienteI>> => {
  try {
    const response = await instance.patch(`cliente/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarCliente = async (id: string): Promise<response> => {
  try {
    const response = await instance.delete(`cliente/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
