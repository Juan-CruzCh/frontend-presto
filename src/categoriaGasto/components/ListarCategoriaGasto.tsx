import { useContext, useEffect, useState } from "react"
import { eliminarCategoria, listarCategoriaGasto } from "../service/categoriaGastoService"
import { CategoriaGastoI } from "../interface/categoriaGasto"
import { PermisosContext } from "../../autenticacion/context/PermisosContext"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { PermisosE } from "../../core/enums/permisos"
import { AlertaEliminar } from "../../core/util/alertaEliminar"
import { HttpStatus } from "../../core/enums/httpStatus"
import { CrearCategoriaModal } from "../modal/CrearCategoriaModal"
import { EditarCategoriaModal } from "../modal/EditarCategoriaModal"
import { ItemsPagina } from "../../core/components/ItemsPAgina"
import { Paginador } from "../../core/components/Paginador"
import toast from "react-hot-toast"
import { Loader } from "../../core/components/Loader"

export const ListarCategoriaGasto = () => {
    const [loading, setLoading] = useState(false);
    const [recargar, setRecargar] = useState(false)
    const { permisosGasto } = useContext(PermisosContext)
    const [categoriaGastos, setCategoriaGastos] = useState<CategoriaGastoI[]>([])
    const [categoria, setCategoria] = useState<string>()
    const [isOpen, setIsOpen] = useState(false);
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const closeModal = () => setIsOpen(false);
    useEffect((

    ) => { categoriaGasto() }, [recargar])

    const categoriaGasto = async () => {
        try {
            setLoading(true)
            const response = await listarCategoriaGasto(limite, pagina)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setCategoriaGastos(response.data)
                setPaginas(response.paginas)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }

    const eliminar = async (cat: string) => {
        try {
            const response = await eliminarCategoria(cat)
            if (response.status == HttpStatus.OK) {
                toast.success('Eliminado')
                setRecargar(!recargar)
            }
        } catch (error) {
            console.log(error);

        }
    }

    const editar = async (gasto: string) => {
        setCategoria(gasto)
        setIsOpen(true)
    }

    return (
        <div className="overflow-x-auto mt-6">
            {permisosGasto.some((i) => i.includes(PermisosE.CREAR_GASTO)) && <CrearCategoriaModal recargar={recargar} setRecargar={setRecargar} />}
            <ItemsPagina limite={setLimite} />
            <table className="min-w-full bg-white  rounded-lg shadow-md">
                <thead className="bg-gray-700 text-white text-left">
                    <tr>
                        <th className="px-4 py-2 ">Nombre</th>
                        <th className="px-4 py-2 ">Fecha</th>
                        <th className="px-4 py-2 ">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriaGastos.map((item) => (
                        <tr className="hover:bg-gray-100">
                            <td className="px-4 py-2 ">{item.nombre}</td>
                            <td className="px-4 py-2 ">{item.fecha}</td>
                            <td className="px-4 py-2 ">
                                {permisosGasto.some((i) => i.includes(PermisosE.ELIMINAR_GASTO)) && <button onClick={() => AlertaEliminar(() => eliminar(item._id))} className=" text-red-500 text-2xl px-3 py-1 rounded">
                                    <MdDelete />
                                </button>}
                                {permisosGasto.some((i) => i.includes(PermisosE.EDITAR_GASTO)) && <button onClick={() => editar(item._id)} className=" text-blue-500 text-2xl px-3 py-1 rounded">
                                    <FaEdit />
                                </button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
            {isOpen && categoria && <EditarCategoriaModal categoria={categoria} closeModal={closeModal} isOpen={isOpen} recargar={recargar} setRecargar={setRecargar} />}
            {loading && <Loader />}
        </div>
    )
}
