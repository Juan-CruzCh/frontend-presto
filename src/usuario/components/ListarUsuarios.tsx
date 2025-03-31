import { useContext, useEffect, useState } from 'react'
import { Paginador } from '../../core/components/Paginador'
import { ItemsPagina } from '../../core/components/ItemsPAgina'
import { CrearUsuariosModal } from '../modal/CrearUsuariosModal'
import { eliminarUsuario, listarUsuarios } from '../service/usuarioService'
import { ListarUsuariosI } from '../interface/listarUsuarios'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import { EditarUsuarioModal } from '../modal/EditarUsuarioModal'
import { HttpStatus } from '../../core/enums/httpStatus'
import { BuscadorUsuario } from './BuscadorUsuario'
import { BuscadorUsuarioI } from '../interface/buscadorCliente'
import { PermisosE } from '../../core/enums/permisos'
import { PermisosContext } from '../../autenticacion/context/PermisosContext'
import { AlertaEliminar } from '../../core/util/alertaEliminar'
import toast from 'react-hot-toast'
import { Loader } from '../../core/components/Loader'

export const ListarUsuarios = () => {
    const [buscador, setBuscador] = useState<BuscadorUsuarioI>({
        apellidoMaterno: '',
        apellidoPaterno: '',
        ci: '',
        nombre: '',
        rol: ''
    })
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const [usuario, setUsuario] = useState<string>()
    const [usuarios, setUsuarios] = useState<ListarUsuariosI[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [recargar, setRecargar] = useState<boolean>(false);
    const { permisosUsuario } = useContext(PermisosContext)
    const [loading, setLoading] = useState(false);
    const closeModal = () => setIsOpen(false);


    useEffect(() => {
        listar()
    }, [recargar, pagina, limite, buscador])
    const listar = async () => {
        try {
            setLoading(true)
            const response = await listarUsuarios(limite, pagina, buscador)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setUsuarios(response.data)
                setPaginas(response.paginas)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }

    const editarUsuario = (usuario: string) => {
        setUsuario(usuario)
        setIsOpen(true)
    }

    const eliminar = async (usuario: string) => {
        try {
            setLoading(true)
            const response = await eliminarUsuario(usuario)


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
        < >
            {permisosUsuario.some((i) => i.includes(PermisosE.LISTAR_USUARIO)) && <CrearUsuariosModal recargar={recargar} setRecargar={setRecargar} />}
            <BuscadorUsuario onSubmit={setBuscador} />
            <ItemsPagina limite={setLimite} />
            <div className="flex flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-start text-xs sm:text-sm font-light text-surface">
                                <thead className="bg-gray-700 text-white text-left text-xs sm:text-sm">
                                    <tr>
                                        <th scope="col" className="px-3 py-2 hidden md:table-cell">CI</th>
                                        <th scope="col" className="px-3 py-2">Nombre</th>
                                        <th scope="col" className="px-3 py-2">Apellidos</th>
                                        <th scope="col" className="px-3 py-2">Usuario</th>
                                        <th scope="col" className="px-3 py-2 hidden md:table-cell">Celular</th>
                                        <th scope="col" className="px-3 py-2 hidden sm:table-cell">Dirección</th>
                                        <th scope="col" className="px-3 py-2">Rol</th>
                                        <th scope="col" className="px-3 py-2">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((item, i) => (
                                        <tr className="border-b border-neutral-200 dark:border-white/10" key={i}>
                                            <td className="whitespace-nowrap px-3 py-2 hidden md:table-cell">{item.ci}</td>
                                            <td className="whitespace-nowrap px-3 py-2">{item.nombre}</td>
                                            <td className="whitespace-nowrap px-3 py-2">{item.apellidoPaterno} {item.apellidoMaterno}</td>
                                            <td className="whitespace-nowrap px-3 py-2">{item.usuario}</td>
                                            <td className="whitespace-nowrap px-3 py-2 hidden md:table-cell">{item.celular}</td>
                                            <td className="whitespace-nowrap px-3 py-2 hidden sm:table-cell">{item.direccion}</td>
                                            <td className="whitespace-nowrap px-3 py-2">{item.rolNombre}</td>
                                            <td className="whitespace-nowrap px-3 py-2 flex gap-1">
                                                {permisosUsuario.some((i) => i.includes(PermisosE.ELIMINAR_USUARIO)) && (
                                                    <button onClick={() => AlertaEliminar(() => eliminar(item._id))} className="text-red-500 text-lg sm:text-2xl px-2 sm:px-3 py-1 rounded">
                                                        <MdDelete />
                                                    </button>
                                                )}
                                                {permisosUsuario.some((i) => i.includes(PermisosE.EDITAR_USUARIO)) && (
                                                    <button onClick={() => editarUsuario(item._id)} className="text-blue-500 text-lg sm:text-2xl px-2 sm:px-3 py-1 rounded">
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
            </div>

            {isOpen && usuario && <EditarUsuarioModal closeModal={closeModal} isOpen={isOpen} usuario={usuario} setRecargar={setRecargar} recargar={recargar} />}
            {loading && <Loader />}
        </>
    )
}
