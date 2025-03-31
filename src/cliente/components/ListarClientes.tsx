import { useContext, useEffect, useState } from "react";
import { ClienteI } from "../interface/cliente";
import { eliminarCliente, listarClientes } from "../services/clienteService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { BuscadorCliente } from "./BuscadorCliente";
import { Paginador } from "../../core/components/Paginador";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { EditarClienteModal } from "../modal/EditarClienteModal";
import { PermisosContext } from "../../autenticacion/context/PermisosContext";
import { PermisosE } from "../../core/enums/permisos";
import { AlertaEliminar } from "../../core/util/alertaEliminar";
import toast from "react-hot-toast";
import { Loader } from "../../core/components/Loader";

export const ListarClientes = () => {
  const { permisosCliente } = useContext(PermisosContext)


  const [data, setData] = useState<ClienteI[]>([])
  const [pagina, setPagina] = useState<number>(1)
  const [limite, setLimite] = useState<number>(20)
  const [paginas, setPaginas] = useState<number>(1)
  const [nombre, setNombre] = useState<string>('')
  const [ci, setCi] = useState<string>('')
  const [codigo, setCodigo] = useState<string>('')
  const [apellidoPaterno, setApellidoPaterno] = useState<string>('')
  const [apellidoMaterno, setApellidoMaterno] = useState<string>('')
  const [cliente, setCliente] = useState<string>()
  const [isOpen, setIsOpen] = useState(false);
  const [recargar, setRecargar] = useState<boolean>(false)
  const [loading, setLoading] = useState(false);

  const closeModal = () => setIsOpen(false);
  useEffect(() => {
    listar()
  }, [limite, pagina, nombre, apellidoMaterno, ci, codigo, apellidoPaterno, recargar])

  const listar = async () => {
    try {
      setLoading(true)
      const response = await listarClientes(limite,
        pagina, codigo,
        ci, apellidoMaterno,
        apellidoPaterno,
        nombre)
      if (response.status == HttpStatus.OK) {
        setLoading(false)
        setData(response.data)
        setPaginas(response.paginas)
      }
    } catch (error) {
      setLoading(false)
      console.log(error);

    }
  }



  const editarCliente = (cliente: string) => {
    setCliente(cliente)
    setIsOpen(true)
  }

  const eliminar = async (cliente: string) => {
    try {
      const response = await eliminarCliente(cliente)
      if (response.status == HttpStatus.OK) {
        toast.success('Eliminado')
        setRecargar(!recargar)
      }
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div className="overflow-x-auto max-w-full p-2 sm:p-4">
      <BuscadorCliente
        setApellidoMaterno={setApellidoMaterno}
        setApellidoPaterno={setApellidoPaterno}
        setCi={setCi}
        setCodigo={setCodigo}
        setNombre={setNombre}
      />
      <div className="relative overflow-x-auto">
        <ItemsPagina limite={setLimite} />

        <table className="min-w-full text-xs sm:text-sm font-light text-surface">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="hidden sm:table-cell py-1 px-2 sm:py-2 sm:px-4">Cod</th>
              <th className="py-1 px-2 sm:py-2 sm:px-4">Ci</th>
              <th className="py-1 px-2 sm:py-2 sm:px-4">Nombre</th>
              <th className="hidden md:table-cell py-1 px-2 sm:py-2 sm:px-4">Apellido Paterno</th>
              <th className="hidden md:table-cell py-1 px-2 sm:py-2 sm:px-4">Apellido Materno</th>
              <th className="py-1 px-2 sm:py-2 sm:px-4">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="bg-white border-b border-gray-200 text-center" key={item._id}>
                <td className="hidden sm:table-cell py-1 px-2 sm:py-2 sm:px-4">{item.codigo}</td>
                <td className="py-1 px-2 sm:py-2 sm:px-4">{item.ci}</td>
                <td className="py-1 px-2 sm:py-2 sm:px-4">{item.nombre}</td>
                <td className="hidden md:table-cell py-1 px-2 sm:py-2 sm:px-4">{item.apellidoPaterno}</td>
                <td className="hidden md:table-cell py-1 px-2 sm:py-2 sm:px-4">{item.apellidoMaterno}</td>
                <td className="py-1 px-2 sm:py-2 sm:px-4">
                  {permisosCliente.some((i) => i.includes(PermisosE.ELIMINAR_CLIENTE)) && (
                    <button onClick={() => AlertaEliminar(() => eliminar(item._id))}
                      className="text-lg sm:text-2xl text-red-500 px-2 sm:px-3 py-1 rounded">
                      <MdDelete />
                    </button>
                  )}
                  {permisosCliente.some((i) => i.includes(PermisosE.EDITAR_CLIENTE)) && (
                    <button onClick={() => editarCliente(item._id)}
                      className="text-lg sm:text-2xl text-blue-500 px-2 sm:px-3 py-1 rounded">
                      <FaEdit />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
      </div>
      {isOpen && cliente && (
        <EditarClienteModal
          cliente={cliente}
          closeModal={closeModal}
          isOpen={isOpen}
          recargar={recargar}
          setRecargar={setRecargar}
        />
      )}
      {loading && <Loader />}
    </div>


  );
};
