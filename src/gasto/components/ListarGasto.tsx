import { useContext, useEffect, useState } from 'react'
import { descargarGastoExcel, eliminarGasto, listarGastos } from '../service/gastoService'
import { GastoI } from '../interface/gasto'
import { separadorMiles } from '../../core/constants/separadorMiles'
import { PermisosContext } from '../../autenticacion/context/PermisosContext'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { PermisosE } from '../../core/enums/permisos'
import { AlertaEliminar } from '../../core/util/alertaEliminar'
import { Paginador } from '../../core/components/Paginador'
import { BuscadorGasto } from './BuscadorGasto'
import { BuscadorGastoI } from '../interface/BuscadorGasto'
import { HttpStatus } from '../../core/enums/httpStatus'
import { ItemsPagina } from '../../core/components/ItemsPAgina'
import { CrearGastoModal } from '../modal/CrearGastoModal'
import { EditarGastoModal } from '../modal/EditarGastoModal'
import toast from 'react-hot-toast'
import { Loader } from '../../core/components/Loader'
import { ButtonDescargarExcel } from '../../core/components/ButtonDescargarExcel'
import { v4 } from "uuid"
export const ListarGasto = () => {
    const [loading, setLoading] = useState(false);
    const { permisosGasto } = useContext(PermisosContext)
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const [buscador, setBuscador] = useState<BuscadorGastoI>({
        categoriaGasto: '',
        fechaFin: '',
        fechaInicio: ''
    })
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const [recargar, setRecargar] = useState(false)
    const [gastos, setGastos] = useState<GastoI[]>([])
    const [gasto, setGasto] = useState<string>()
    useEffect(() => {
        listar()
    }, [limite, pagina, buscador, recargar])
    const listar = async () => {
        try {
            setLoading(true)
            const response = await listarGastos(limite, pagina, buscador)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setGastos(response.data)
                setPaginas(response.paginas)
            }

        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }
    const eliminar = async (gasto: string) => {
        try {
            setLoading(true)
            const response = await eliminarGasto(gasto)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                toast.success('Eliminado')
                setRecargar(!recargar)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }

    const editar = async (gasto: string) => {
        setGasto(gasto)
        setIsOpen(true)
    }

    const descargarGastosExcel = async () => {
        try {
            setLoading(true)
            const response = await descargarGastoExcel(buscador)
            setLoading(false)
            const blob = response;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${v4()}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            setLoading(false)
            console.log(error);


        }
    }

    return (
        <div className="flex flex-col overflow-x-auto sm:overflow-x-auto">
            {permisosGasto.some((i) => i.includes(PermisosE.CREAR_GASTO)) && <CrearGastoModal recargar={recargar} setRecargar={setRecargar} />}
            <BuscadorGasto onSubmit={setBuscador} />
            <ButtonDescargarExcel onClick={descargarGastosExcel} />
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <ItemsPagina limite={setLimite} />
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-lg text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-gray-700 text-white text-left text-[10px] sm:text-sm">
                                    <th className="px-2 py-1 sm:px-6 sm:py-4">Categoria gasto</th>
                                    <th className="px-2 py-1 sm:px-6 sm:py-4 hidden sm:table-cell">Descripcion</th>
                                    <th className="px-2 py-1 sm:px-6 sm:py-4 hidden sm:table-cell">Unidad de Manejo</th>
                                    <th className="px-2 py-1 sm:px-6 sm:py-4">Cantidad</th>
                                    <th className="px-2 py-1 sm:px-6 sm:py-4">Costo Unitario</th>
                                    <th className="px-2 py-1 sm:px-6 sm:py-4">Factor Validez P/Año</th>
                                    <th className="px-2 py-1 sm:px-6 sm:py-4">Costo por Año</th>
                                    <th className="px-2 py-1 sm:px-6 sm:py-4 hidden sm:table-cell">Fecha</th>
                                    <th className="px-2 py-1 sm:px-6 sm:py-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gastos.map((item, i) => (
                                    <tr key={i} className="odd:bg-gray-100">
                                        <td className="py-1 px-2 sm:px-4 ">{item.categoria}</td>
                                        <td className="py-1 px-2 sm:px-4 hidden sm:table-cell">{item.descripcion}</td>
                                        <td className="py-1 px-2 sm:px-4 hidden sm:table-cell">{item.unidadManejo}</td>
                                        <td className="py-1 px-2 sm:px-4">{item.cantidad}</td>
                                        <td className="py-1 px-2 sm:px-4">{item.costoUnitario.toLocaleString(separadorMiles)}</td>
                                        <td className="py-1 px-2 sm:px-4">{item.factorValides}</td>
                                        <td className="py-1 px-2 sm:px-4">{item.costoAqo.toLocaleString(separadorMiles)}</td>
                                        <td className="py-1 px-2 sm:px-4 hidden sm:table-cell">{item.fecha}</td>
                                        <td className="py-1 px-2 sm:px-4 flex space-x-2">
                                            {permisosGasto.some((i) => i.includes(PermisosE.ELIMINAR_GASTO)) && (
                                                <button onClick={() => AlertaEliminar(() => eliminar(item._id))} className="text-red-500 text-lg sm:text-xl px-2 py-1 rounded">
                                                    <MdDelete />
                                                </button>
                                            )}
                                            {permisosGasto.some((i) => i.includes(PermisosE.EDITAR_GASTO)) && (
                                                <button onClick={() => editar(item._id)} className="text-blue-500 text-lg sm:text-xl px-2 py-1 rounded">
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
                </div>
            </div>

            {isOpen && gasto && <EditarGastoModal gasto={gasto} recargar={recargar} setRecargar={setRecargar} closeModal={closeModal} isOpen={isOpen} />}
            {loading && <Loader />}
        </div>


    )
}

