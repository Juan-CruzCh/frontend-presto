import { useEffect, useState } from 'react'
import { listarRolesPublic } from '../../rol/service/rolService';
import { ListarRolesI } from '../../rol/interface/ListarRoles';
import { useForm } from 'react-hook-form';
import { CrearUsuarioI } from '../interface/crearUsuario';
import { editarUsuario, usuarioOne } from '../service/usuarioService';
import { HttpStatus } from '../../core/enums/httpStatus';
import { AxiosError } from 'axios';
import { ErrorI } from '../../core/interface/error';
import toast from 'react-hot-toast';
import { Loader } from '../../core/components/Loader';

export const EditarUsuarioModal = (
    { usuario, closeModal, isOpen, recargar, setRecargar }: {
        usuario: string,
        closeModal: () => void, isOpen: boolean,
        recargar: boolean,

        setRecargar: (recargar: boolean) => void
    }
) => {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<ListarRolesI[]>([])
    const [ciConflicto, setCiConflicto] = useState<string>('')
    const [usuarioConflicto, setUsuarioConflicto] = useState<string>('')
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CrearUsuarioI>()

    useEffect(() => {
        if (isOpen) {
            listarUsuario()
            listarRoles()
        }
    }, [isOpen])

    const listarUsuario = async () => {
        try {
            setLoading(true)
            const response = await usuarioOne(usuario)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setValue("nombre", response.data.nombre)
                setValue("apellidoPaterno", response.data.apellidoPaterno)
                setValue("apellidoMaterno", response.data.apellidoMaterno)
                setValue("celular", response.data.celular)
                setValue("ci", response.data.ci)
                setValue("rol", response.data.rol)
                setValue("usuario", response.data.usuario)
                setValue("direccion", response.data.direccion)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }

    const listarRoles = async () => {
        try {
            const response = await listarRolesPublic()
            setRoles(response)
        } catch (error) {
            console.log(error);

        }
    }
    const onSubmit = async (data: CrearUsuarioI) => {
        try {

            setLoading(true)
            const response = await editarUsuario(usuario, data)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                toast.success('Usuario actualizado')
                setRecargar(!recargar)
                closeModal()

            }
        } catch (error) {
            setLoading(false)
            const e = error as AxiosError
            const er = e.response?.data as ErrorI

            if (e.response?.status == HttpStatus.CONFLICT) {
                if (er.propiedad == 'ci') {
                    setCiConflicto(er.message)
                }
                if (er.propiedad == 'usuario') {
                    setUsuarioConflicto(er.message)
                }

            }

        }

    }

    return (
        <div className="p-4">
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Fondo oscuro */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>

                    {/* Modal */}
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Registrar usuario</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={(handleSubmit(onSubmit))}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="nombre">
                                        Ci
                                    </label>
                                    <input
                                        {...register("ci", { required: 'El ci es requerido' })}
                                        id="ci"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.ci && <p className='text-red-500 text-xs'>{errors.ci.message}</p>}
                                    {ciConflicto && <p className='text-red-500 text-xs'>{ciConflicto}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="nombre">
                                        Nombre
                                    </label>
                                    <input
                                        {...register("nombre", { required: 'El nombre es requerido' })}
                                        id="nombre"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.nombre && <p className='text-red-500 text-xs'>{errors.nombre.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="apellidoPaterno">
                                        Apellido paterno
                                    </label>
                                    <input
                                        {...register("apellidoPaterno", { required: 'El apellido paterno es requerido' })}
                                        id="apellidoPaterno"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.apellidoPaterno && <p className='text-red-500 text-xs'>{errors.apellidoPaterno.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="apellidoMaterno">
                                        Apellido materno
                                    </label>
                                    <input
                                        {...register("apellidoMaterno")}
                                        id="apellidoMaterno"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="usuario">
                                        Usuario
                                    </label>
                                    <input
                                        {...register("usuario", { required: 'El usuario  es requerido' })}
                                        id="usuario"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.usuario && <p className='text-red-500 text-xs'>{errors.usuario.message}</p>}
                                    {usuarioConflicto && <p className='text-red-500 text-xs'>{usuarioConflicto}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="direccion">
                                        Dirección
                                    </label>
                                    <input
                                        {...register("direccion")}
                                        id="direccion"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="direccion">
                                        Celular
                                    </label>
                                    <input
                                        {...register("celular")}
                                        id="celular"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="roles">
                                        Roles
                                    </label>
                                    <select
                                        {...register("rol", { required: 'Seleccione el rol' })}
                                        id="roles"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Seleccione su rol</option>
                                        {roles.map((item, i) => <option key={i} value={item._id}>{item.nombre}</option>
                                        )}
                                    </select>
                                    {errors.rol && <p className='text-red-500 text-xs'>{errors.rol.message}</p>}
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    type='submit'
                                    className="ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {loading && <Loader />}
        </div>

    );
};