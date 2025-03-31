import Swal from "sweetalert2";

export const alertaDePago = async (): Promise<boolean> => {
  const { isConfirmed } = await Swal.fire({
    title: "¿Deseas continuar con el pago?",
    text: "Una vez confirmado, no podrás revertir esta acción.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, pagar",
    cancelButtonText: "Cancelar",
  });

  return isConfirmed;
};

export const alertaSeguirPagando = async (): Promise<boolean> => {
  const { isConfirmed } = await Swal.fire({
    title: "¿Deseas seguir realizando pagos?",
    text: "Puedes continuar con más pagos o finalizar aquí.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "No, finalizar",
  });

  return isConfirmed;
};
