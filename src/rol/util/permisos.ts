import { ModulePermissions } from "../interface/rol";

export const availablePermissions: ModulePermissions = {
  GASTO: [
    { id: "LISTAR_GASTO", label: "Ver Gastos" },
    { id: "CREAR_GASTO", label: "Crear Gastos" },
    { id: "EDITAR_GASTO", label: "Editar Gastos" },
    { id: "ELIMINAR_GASTO", label: "Eliminar Gastos" },
  ],
  LECTURA: [
    { id: "CREAR_LECTURA", label: "Ver Lecturas" },
    { id: "LISTAR_LECTURA", label: "Crear Lecturas" },
    { id: "EDITAR_LECTURA", label: "Editar Lecturas" },
    { id: "ELIMINAR_LECTURA", label: "Eliminar Lecturas" },
  ],
  PAGO: [
    { id: "LISTAR_PAGO", label: "listar Pagos" },
    { id: "CREAR_PAGO", label: "Crear Pagos" },
    // { id: "ANULAR_PAGO", label: "Anular Pago" },
  ],
  TARIFA: [
    { id: "LISTAR_TARIFA", label: "Ver Tarifas" },
    { id: "EDITAR_TARIFA", label: "Editar Tarifas" },
    { id: "CREAR_TARIFA", label: "Crear Tarifas" },
    { id: "ELIMINAR_TARIFA", label: "Eliminar Tarifas" },
  ],
  MEDIDOR: [
    { id: "LISTAR_MEDIDOR", label: "Ver Medidor" },
    { id: "EDITAR_MEDIDOR", label: "Editar Medidor" },
    { id: "CREAR_MEDIDOR", label: "Crear Medidor" },
    { id: "ELIMINAR_MEDIDOR", label: "Eliminar Medidor" },
  ],
  ROL: [
    { id: "LISTAR_ROL", label: "Ver Rol" },
    { id: "EDITAR_ROL", label: "Editar Rol" },
    { id: "CREAR_ROL", label: "Crear Rol" },
    { id: "ELIMINAR_ROL", label: "Eliminar Rol" },
  ],

  Cliente: [
    { id: "LISTAR_CLIENTE", label: "Ver Cliente" },
    { id: "EDITAR_CLIENTE", label: "Editar Clinte" },
    { id: "CREAR_CLIENTE", label: "Crear cliente" },
    { id: "ELIMINAR_CLIENTE", label: "Eliminar Cliente" },
  ],

  Usuario: [
    { id: "LISTAR_USUARIO", label: "Ver Usuario" },
    { id: "EDITAR_USUARIO", label: "Editar Usuario" },
    { id: "CREAR_USUARIO", label: "Crear Usuario" },
    { id: "ELIMINAR_USUARIO", label: "Eliminar Usuario" },
  ],
};
