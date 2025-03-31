import { instance } from "../../config/instance";
import { response } from "../../core/interface/response";
import { ResponseOneI } from "../../core/interface/responseOne";
import { DataRol } from "../interface/dataRo";
import { ListarRolesI } from "../interface/ListarRoles";

export const crearRol = async (data: DataRol): Promise<response> => {
  try {
    const renponse = await instance.post("rol", data);
    return renponse.data;
  } catch (error) {
    throw error;
  }
};

export const listarRolesPublic = async (): Promise<ListarRolesI[]> => {
  try {
    const renponse = await instance.get("rol/publicas");
    return renponse.data;
  } catch (error) {
    throw error;
  }
};

export const listarRoles = async (): Promise<ListarRolesI[]> => {
  try {
    const renponse = await instance.get("rol");
    return renponse.data;
  } catch (error) {
    throw error;
  }
};

export const listarRolUser = async (): Promise<ListarRolesI> => {
  try {
    const renponse = await instance.get("rol/user");
    return renponse.data;
  } catch (error) {
    throw error;
  }
};

export const listarRolOne = async (
  id: string
): Promise<ResponseOneI<ListarRolesI>> => {
  try {
    const renponse = await instance.get(`rol/${id}`);
    return renponse.data;
  } catch (error) {
    throw error;
  }
};

export const editarRol = async (
  id: string,
  data: DataRol
): Promise<response> => {
  try {
    const renponse = await instance.patch(`rol/${id}`, data);
    return renponse.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarRol = async (id: string): Promise<response> => {
  try {
    const renponse = await instance.delete(`rol/${id}`);
    return renponse.data;
  } catch (error) {
    throw error;
  }
};
