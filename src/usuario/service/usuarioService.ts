import { instance } from "../../config/instance";
import { ParamsI } from "../../core/interface/params";
import { response } from "../../core/interface/response";
import { ResponseDataI } from "../../core/interface/responseData";
import { ResponseOneI } from "../../core/interface/responseOne";
import { BuscadorUsuarioI } from "../interface/buscadorCliente";
import { CrearUsuarioI } from "../interface/crearUsuario";
import { ListarUsuariosI } from "../interface/listarUsuarios";

export const crearUsuario = async (data: CrearUsuarioI): Promise<response> => {
  try {
    const response = await instance.post("usuario", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listarUsuarios = async (
  limite: number,
  pagina: number,
  buscador: BuscadorUsuarioI
): Promise<ResponseDataI<ListarUsuariosI>> => {
  const params: ParamsI & BuscadorUsuarioI = {
    limite: limite,
    pagina: pagina,
  };
  buscador.apellidoMaterno
    ? (params.apellidoMaterno = buscador.apellidoMaterno)
    : params;
  buscador.apellidoPaterno
    ? (params.apellidoPaterno = buscador.apellidoPaterno)
    : params;
  buscador.ci ? (params.ci = buscador.ci) : params;
  buscador.rol ? (params.rol = buscador.rol) : params;
  buscador.nombre ? (params.nombre = buscador.nombre) : params;

  console.log(params);

  try {
    const response = await instance.get("usuario", {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const usuarioOne = async (
  usuario: string
): Promise<ResponseOneI<CrearUsuarioI>> => {
  try {
    const response = await instance.get(`usuario/${usuario}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editarUsuario = async (
  usuario: string,
  data: CrearUsuarioI
): Promise<response> => {
  try {
    const response = await instance.patch(`usuario/${usuario}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eliminarUsuario = async (usuario: string): Promise<response> => {
  try {
    const response = await instance.delete(`usuario/${usuario}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const perfilUsuario = async (): Promise<
  ResponseOneI<ListarUsuariosI>
> => {
  try {
    const response = await instance.get(`usuario/perfil/cuenta`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
