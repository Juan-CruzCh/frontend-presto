import { useContext, useEffect, useState } from 'react'
import { eliminarTarifa, listarTarifas } from '../service/tarifasService'
import { TarifaI } from '../interface/tarifa'
import { MdDelete } from 'react-icons/md'
import { IoMdInformationCircle } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import { ListarRangoModal } from '../modal/ListarRangoModal'

import { EditarTarifa } from '../modal/EditarTarifa'
import { PermisosContext } from '../../autenticacion/context/PermisosContext'
import { PermisosE } from '../../core/enums/permisos'
import { CrearTarifa } from '../modal/CrearTarifa'
import { HttpStatus } from '../../core/enums/httpStatus'
import { AlertaEliminar } from '../../core/util/alertaEliminar'
import toast from 'react-hot-toast'
import { Loader } from '../../core/components/Loader'


export const ListarTarifas = () => {
    const [abriModalRango, setModalRango] = useState(false)
    const [tarifas, setTarifas] = useState<TarifaI[]>([])
    const [tarifa, setTarifa] = useState<string>()
    const { permisosTarifa } = useContext(PermisosContext)
    const [recargar, setRecargar] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    useEffect(() => {
        listar()
    }, [recargar])

    const listar = async () => {

        try {
            setLoading(true)
            const response = await listarTarifas()
            setLoading(false)
            setTarifas(response)
        } catch (error) {

        }
    }
    const cerrarModalRango = () => {
        setModalRango(false)
    }

    const verRangoTarifa = async (tarifa: string) => {
        setModalRango(true)
        setTarifa(tarifa)
    }
    const editar = (tarifa: string) => {
        setTarifa(tarifa)
        setIsOpen(true)
    }
    const eliminar = async (tarifa: string) => {
        try {
            setLoading(true)
            const response = await eliminarTarifa(tarifa)


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
        <div className="overflow-x-auto">

            {permisosTarifa.some((i) => i.includes(PermisosE.CREAR_TARIFA)) && <CrearTarifa recargar={recargar} setRecargar={setRecargar} />}

            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-700 text-white text-left">
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                            Nombre Tarifa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tarifas.map((item, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {permisosTarifa.some((i) => i.includes(PermisosE.ELIMINAR_TARIFA)) && <button onClick={() => AlertaEliminar(() => eliminar(item._id))} className='text-2xl text-red-500'>
                                    <MdDelete />
                                </button>}
                                <button onClick={() => verRangoTarifa(item._id)} className='text-2xl' >
                                    <IoMdInformationCircle />
                                </button>

                                {permisosTarifa.some((i) => i.includes(PermisosE.EDITAR_TARIFA)) && <button onClick={() => editar(item._id)} className='text-2xl text-blue-500' >
                                    <FaRegEdit />
                                </button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {abriModalRango && tarifa && <ListarRangoModal isOpen={abriModalRango} closeModal={cerrarModalRango} tarifa={tarifa} />}
            {isOpen && tarifa && <EditarTarifa
                closeModal={closeModal}
                isOpen={isOpen} tarifa={tarifa}
                recargar={recargar}
                setRecargar={setRecargar}

            />}
            {loading && <Loader />}
        </div>
    )
}
