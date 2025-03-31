import { MdDelete } from "react-icons/md";
import { RangoI } from "../interface/rango";
import { FaEdit } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { EditarRangoModal } from "./EditarRango";
import { eliminarRango, listarRangoTarifa } from "../service/tarifasService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { AlertaEliminar } from "../../core/util/alertaEliminar";
import { PermisosContext } from "../../autenticacion/context/PermisosContext";
import { PermisosE } from "../../core/enums/permisos";
import toast from "react-hot-toast";
import { Loader } from "../../core/components/Loader";

export const ListarRangoModal = ({ isOpen, closeModal, tarifa }: { isOpen: boolean, closeModal: () => void, tarifa: string }) => {
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [rango, setRango] = useState<string>()
    const [rangos, setRangos] = useState<RangoI[]>([])
    const [recargar, setRecargar] = useState<boolean>(false)
    const { permisosTarifa } = useContext(PermisosContext)
    const closeModalEdit = () => setIsOpenEdit(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (isOpen) {
            verRangoTarifa()
        }
    }, [isOpen, recargar])
    const verRangoTarifa = async () => {

        try {
            setLoading(true)
            const response = await listarRangoTarifa(tarifa)
            setLoading(false)
            setRangos(response)

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    const editarRango = (rango: string) => {
        setRango(rango)
        setIsOpenEdit(true)

    }

    const eliminar = async (rango: string) => {
        try {
            setLoading(true)
            const response = await eliminarRango(rango)
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
        <div className="p-4">




            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>


                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-2xl">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{rangos.length > 0 && rangos[0].tarifa}</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <table className="min-w-full">
                                <thead className="bg-gray-200 text-gray-700 uppercase">
                                    <tr className='text-sm'>
                                        <th className="py-3 px-4 border-b text-left">Rango 1</th>
                                        <th className="py-3 px-4 border-b text-left">Rango 2</th>
                                        <th className="py-3 px-4 border-b text-left">costo</th>
                                        <th className="py-3 px-4 border-b text-left">Iva</th>
                                        <th className="py-3 px-4 border-b text-left">Accion</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {rangos.map((item, index) => (
                                        <tr key={index} className="text-sm border-b hover:bg-gray-100 transition duration-200">

                                            <td className="py-3 px-4">{item.rango1}</td>
                                            <td className="py-3 px-4">{item.rango2}</td>
                                            <td className="py-3 px-4">{item.costo}</td>
                                            <td className="py-3 px-4">{item.iva}</td>
                                            <td className="py-2 px-4">

                                                {permisosTarifa.some((i) => i.includes(PermisosE.ELIMINAR_TARIFA)) && <button onClick={() => AlertaEliminar(() => eliminar(item._id))} className=" text-red-500 text-2xl px-3 py-1 rounded">
                                                    <MdDelete />
                                                </button>}
                                                {permisosTarifa.some((i) => i.includes(PermisosE.EDITAR_TARIFA)) && <button onClick={() => editarRango(item._id)} className=" text-blue-500 text-2xl px-3 py-1 rounded">
                                                    <FaEdit />
                                                </button>}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isOpenEdit && rango &&
                <EditarRangoModal closeModal={closeModalEdit}
                    isOpen={isOpenEdit} rango={rango}
                    recargar={recargar}
                    setRecargar={setRecargar}
                />}

            {loading && <Loader />}
        </div>
    );
};
