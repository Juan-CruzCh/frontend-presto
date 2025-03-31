import { format } from "date-fns";

export function formateaFecha(fechaOriginal: string) {
  const fecha = new Date(fechaOriginal);
  const fechaFormateada = format(fecha, "dd/MM/yyyy HH:mm:ss");
  return fechaFormateada;
}
