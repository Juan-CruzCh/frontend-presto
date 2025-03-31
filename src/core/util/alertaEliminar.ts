import Swal from "sweetalert2";

export const AlertaEliminar = (accion: () => void) => {
  return Swal.fire({
    title: "¿Estás seguro de eliminar este elemento?",
    text: "¡No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      accion();
    }
  });
};
