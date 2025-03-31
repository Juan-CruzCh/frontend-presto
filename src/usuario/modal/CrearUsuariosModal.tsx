import { useEffect, useState } from 'react'
import { listarRolesPublic } from '../../rol/service/rolService';
import { ListarRolesI } from '../../rol/interface/ListarRoles';
import { useForm } from 'react-hook-form';
import { CrearUsuarioI } from '../interface/crearUsuario';
import { crearUsuario } from '../service/usuarioService';
import { HttpStatus } from '../../core/enums/httpStatus';
import { AxiosError } from 'axios';
import { ErrorI } from '../../core/interface/error';
import toast from 'react-hot-toast';
import { Loader } from '../../core/components/Loader';

export const CrearUsuariosModal = ({ recargar, setRecargar }: { recargar: boolean, setRecargar: (recargar: boolean) => void }) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<CrearUsuarioI>()
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<ListarRolesI[]>([])
    const [ciConflicto, setCiConflicto] = useState<string>('')
    const [usuarioConflicto, setUsuarioConflicto] = useState<string>('')
    const password = watch("password")

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    useEffect(() => {
        if (isOpen) {
            listarRoles()
        }
    }, [isOpen])

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
            const response = await crearUsuario(data)
            if (response.status == HttpStatus.CREATED) {
                setLoading(false)
                toast.success('Usuario registrado')
                setRecargar(!recargar)
                closeModal()
            }
        } catch (error) {
            setLoading(false)
            console.log(error);

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
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={openModal}
            >
                Registrar
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    {/* Fondo oscuro */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>

                    {/* Modal */}
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-800">Regitrar usuario</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <form onSubmit={(handleSubmit(onSubmit))}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                                        Contraseña
                                    </label>
                                    <input
                                        {...register("password", { required: 'El contraseña  es requerido' })}
                                        id="password"
                                        type="password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="repetirContraseña">
                                        Repita la contraseña
                                    </label>
                                    <input
                                        {...register("password2", {
                                            validate: (value) => {
                                                if (!value) {
                                                    return 'Ingrese la contraseña'
                                                }
                                                if (password != value) {
                                                    return 'La contraseñas no conciden'
                                                }
                                                return true
                                            }
                                        })}
                                        id="repetirContraseña"
                                        type="password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.password2 && <p className='text-red-500 text-xs'>{errors.password2.message}</p>}
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
                                    <label className="block text-gray-700 font-medium mb-2" htmlFor="celular">
                                        Celular
                                    </label>
                                    <input
                                        {...register("celular", { required: 'El numero de celualar es requerido' })}
                                        id="celular"
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.celular && <p className='text-red-500 text-xs'>{errors.celular.message}</p>}
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