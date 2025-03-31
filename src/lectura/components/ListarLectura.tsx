import { useContext, useEffect, useState } from "react";
import { eliminarLectura, listarLecturas } from "../service/lecturaService";
import { ListarLecturaI } from "../interface/listarLecturas";
import { BuscadorLectura } from "./BuscadorLectura";
import { useNavigate } from "react-router";
import { BuscadorLecturaI } from "../interface/buscadorLectura";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { Paginador } from "../../core/components/Paginador";
import { HttpStatus } from "../../core/enums/httpStatus";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { EditarLecturaModal } from "../modal/EditarLecturaModal";
import { EstadoPagoE } from "../../pago/enum/estadoPago";
import { PermisosContext } from "../../autenticacion/context/PermisosContext";
import { PermisosE } from "../../core/enums/permisos";
import { AlertaEliminar } from "../../core/util/alertaEliminar";
import toast from "react-hot-toast";
import { Loader } from "../../core/components/Loader";

export const ListarLectura = () => {
    const [loading, setLoading] = useState(false);
    const date = new Date()
    const fecha = date.toISOString().split('T')[0]
    const navigate = useNavigate()
    const [recargar, setRecargar] = useState<boolean>(false);
    const [data, setData] = useState<ListarLecturaI[]>([]);
    const [lectura, setLectura] = useState<string>()
    const [isOpen, setIsOpen] = useState(false);
    const { permisosLectura } = useContext(PermisosContext)
    const closeModal = () => setIsOpen(false);

    const [buscador, setBuscador] = useState<BuscadorLecturaI>(
        {
            fechaFin: fecha,
            fechaInicio: fecha,
            estado: null,
            numeroMedidor: null
        }
    )
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)

    useEffect(() => {
        lecturas()
    }, [limite, pagina, buscador, recargar])

    const lecturas = async () => {
        try {
            setLoading(true)
            const response = await listarLecturas(limite, pagina, buscador)
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

    const editarLectura = (lectura: string) => {
        setLectura(lectura)
        setIsOpen(true)


    }

    const eliminar = async (lectura: string) => {
        try {
            setLoading(true)
            const response = await eliminarLectura(lectura)
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
    return (




        <div className="flex flex-col overflow-x-auto sm:overflow-x-auto">

            <BuscadorLectura onSubmit={setBuscador} />
            <ItemsPagina limite={setLimite} />
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-start text-xs sm:text-sm font-light text-surface">
                            <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                                <tr className="bg-gray-700 text-white text-left">
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4 hidden sm:table-cell">Gestion</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">N° Medidor</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Mes</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Lect. Ant</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Lect. Act </th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Cons (m³)</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4 hidden sm:table-cell">Monto</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4 hidden sm:table-cell">Estado</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4 hidden sm:table-cell">Fecha</th>
                                    <th scope="col" className="px-3 py-2 sm:px-6 sm:py-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr className="border-b border-neutral-200 dark:border-white/10" key={i}>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4 hidden sm:table-cell">{item.gestion}</td>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4 ">{item.numeroMedidor}</td>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4">{item.mes}</td>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4">{item.lecturaAnterior}</td>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4">{item.lecturaActual}</td>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4 ">{item.consumoTotal}</td>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4 hidden sm:table-cell">{item.costoApagar}</td>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4 hidden sm:table-cell">{item.estado}</td>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4 hidden sm:table-cell">{item.fecha}</td>
                                        <td className="whitespace-nowrap px-3 py-2 sm:px-6 sm:py-4">
                                            <button
                                                onClick={() => navigate(`/lectura/recibo/${item.medidor}/${item._id}`)}
                                                className="bg-green-600 p-1 rounded-lg text-white text-xs sm:text-sm">
                                                Recibo
                                            </button>

                                            {item.estado !== EstadoPagoE.PAGADO &&
                                                permisosLectura.some((i) => i.includes(PermisosE.ELIMINAR_LECTURA)) && (
                                                    <button
                                                        onClick={() => AlertaEliminar(() => eliminar(item._id))}
                                                        className="text-red-500 text-lg sm:text-2xl px-2 py-1 rounded">
                                                        <MdDelete />
                                                    </button>
                                                )}

                                            {item.estado !== EstadoPagoE.PAGADO &&
                                                permisosLectura.some((i) => i.includes(PermisosE.EDITAR_LECTURA)) && (
                                                    <button
                                                        onClick={() => editarLectura(item._id)}
                                                        className="text-blue-500 text-lg sm:text-2xl px-2 py-1 rounded">
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
            {isOpen && lectura && <EditarLecturaModal closeModal={closeModal} isOpen={isOpen} lectura={lectura} recargar={recargar} setRecargar={setRecargar} />}
            {loading && <Loader />}
        </div>


    );
}
