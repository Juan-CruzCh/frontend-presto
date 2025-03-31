import { instance } from "../../config/instance";
import { AutenticacionI } from "../interface/autenticacion";
import { ResponseAutenticacionI } from "../interface/responseAutenticacion";

export const autenticacion = async (
  data: AutenticacionI
): Promise<ResponseAutenticacionI> => {
  try {
    const response = instance.post("autenticacion", data);
    return (await response).data;
  } catch (error) {
    throw error;
  }
};
