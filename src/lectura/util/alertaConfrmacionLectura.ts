import Swal from "sweetalert2";

export const alertaConfirmacionLectura = (): Promise<boolean> => {
  return Swal.fire({
    title: "¿Estás seguro?",
    // text: "¡No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, registrar lectura",
  }).then((result) => {
    return result.isConfirmed;
  });
};
