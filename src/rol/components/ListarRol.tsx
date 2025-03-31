import { useContext, useEffect, useState } from 'react'
import { eliminarRol, listarRoles } from '../service/rolService'
import { ListarRolesI } from '../interface/ListarRoles'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { HttpStatus } from '../../core/enums/httpStatus'
import { PermisosContext } from '../../autenticacion/context/PermisosContext'
import { PermisosE } from '../../core/enums/permisos'
import { AlertaEliminar } from '../../core/util/alertaEliminar'
import { Loader } from '../../core/components/Loader'

export const ListarRol = () => {
    const [loading, setLoading] = useState(false);
    const navidate = useNavigate()
    const [rol, setRol] = useState<ListarRolesI[]>([])
    const [openPermission, setOpenPermission] = useState<string | null>(null)
    const [recargar, setRecargar] = useState<boolean>(false)
    const { permisosRol } = useContext(PermisosContext)
    useEffect(() => {
        roles()
    }, [recargar])

    const roles = async () => {
        try {
            const response = await listarRoles()
            setRol(response)
        } catch (error) {
            console.log(error)
        }
    }

    const togglePermission = (id: string) => {
        setOpenPermission(openPermission === id ? null : id)
    }

    const eliminar = async (id: string) => {
        try {
            setLoading(true)
            const response = await eliminarRol(id)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setRecargar(!recargar)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }


    return (
        <div className="overflow-x-auto max-w-full">
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full text-start text-sm font-light text-surface ">
                    <thead className="bg-gray-700 text-white text-left text-xs sm:text-sm">
                        <tr>
                            <th className="py-3 px-4 text-left">Rol</th>
                            <th className="py-3 px-4 text-left">Permisos</th>
                            <th className="py-3 px-4 text-center">Acción</th>

                        </tr>
                    </thead>
                    <tbody>
                        {rol.map((item) => (
                            <tr
                                className="bg-white border-b  dark:border-gray-700 border-gray-200 text-center"
                                key={item._id}
                            >
                                <td className="py-3 px-4">{item.nombre}</td>
                                <td className="py-3 px-4">
                                    <button
                                        onClick={() => togglePermission(item._id)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 focus:outline-none transition duration-300"
                                    >
                                        {openPermission === item._id ? "Ocultar Permisos" : "Ver Permisos"}
                                    </button>

                                    {openPermission === item._id && (
                                        <div className="mt-3 p-4">
                                            <div className="space-y-2">
                                                {item.permisos.map((permiso, index) => (
                                                    <ol
                                                        key={index}
                                                        className="text-gray-700"
                                                    >
                                                        {permiso}
                                                    </ol>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </td>


                                <td className="py-3 px-4">
                                    {permisosRol.some((i) => i.includes(PermisosE.ELIMINAR_ROL)) && <button onClick={() => AlertaEliminar(() => eliminar(item._id))} className="text-red-500 text-2xl px-3 py-1 rounded hover:bg-red-100 transition duration-200">
                                        <MdDelete />
                                    </button>}
                                    {permisosRol.some((i) => i.includes(PermisosE.EDITAR_ROL)) && <button onClick={() => navidate(`/editar/rol/${item._id}`)} className="text-blue-500 text-2xl px-3 py-1 rounded hover:bg-blue-100 transition duration-200">
                                        <FaEdit />
                                    </button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div >
            {loading && <Loader />}
        </div >
    )
}
