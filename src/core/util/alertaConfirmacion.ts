import Swal from "sweetalert2";

export const alertaConfirmacion = (): Promise<boolean> => {
  return Swal.fire({
    title: "¿Estás seguro?",
    // text: "¡No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    return result.isConfirmed;
  });
};
