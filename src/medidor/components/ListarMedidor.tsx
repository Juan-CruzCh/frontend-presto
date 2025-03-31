import { useContext, useEffect, useState } from "react";
import { eliminarMedidor, listarMedidor } from "../service/MedidorService";
import { MedidorCliente } from "../interface/medidorCliente";
import { BuscadorMedidor } from "./BuscadorMedidor";
import { BuscadorMedidorClientI } from "../interface/buscadorMedidorCliente";
import { Paginador } from "../../core/components/Paginador";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { HttpStatus } from "../../core/enums/httpStatus";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { EditarMedidorModal } from "../modal/EditarMedidorModal";
import { EstadoMedidorE } from "../enum/estadoMedidor";
import { PermisosContext } from "../../autenticacion/context/PermisosContext";
import { PermisosE } from "../../core/enums/permisos";
import { AlertaEliminar } from "../../core/util/alertaEliminar";
import { Loader } from "../../core/components/Loader";

export const ListarMedidor = () => {
    const [data, setData] = useState<MedidorCliente[]>([]);
    const [loading, setLoading] = useState(false);
    const [buscador, setBuscador] = useState<BuscadorMedidorClientI>({
        apellidoMaterno: null,
        apellidoPaterno: null,
        ci: null,
        nombre: null,
        numeroMedidor: null,
        estado: null
    });
    const { permisosMedidor } = useContext(PermisosContext)
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const [recargar, setRecargar] = useState<boolean>(false)


    const [medidor, setMedidor] = useState<string>()

    const [isOpen, setIsOpen] = useState(false);


    const closeModal = () => setIsOpen(false);



    useEffect(() => {
        listar();
    }, [buscador, limite, pagina, recargar]);

    const listar = async () => {
        try {
            setLoading(true)
            const response = await listarMedidor(buscador, limite, pagina);
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setData(response.data);
                setPaginas(response.paginas)
            }
        } catch (error) {
            console.error("Error al listar medidores:", error);
        } finally {
            setLoading(false);
        }
    };

    const medidorId = (medidor: string) => {
        setMedidor(medidor)
        setIsOpen(true)
    }

    const eliminar = async (medidor: string) => {
        try {
            const response = await eliminarMedidor(medidor)
            if (response.status == HttpStatus.OK) {
                setRecargar(!recargar)
            }
        } catch (error) {

        }

    }
    return (
        <>
            <BuscadorMedidor onSubmit={setBuscador} />
            <ItemsPagina limite={setLimite} />
            <div className="flex flex-col overflow-x-auto">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 rounded-lg shadow-lg text-xs sm:text-sm">
                                <thead>
                                    <tr className="bg-gray-700 text-white text-left">
                                        <th scope="col" className="px-2 py-1 hidden sm:table-cell">Cod Cliente</th>
                                        <th scope="col" className="px-2 py-1">CI</th>
                                        <th scope="col" className="px-2 py-1">Nombre</th>
                                        <th scope="col" className="px-2 py-1">Apellido Paterno</th>
                                        <th scope="col" className="px-2 py-1 hidden md:table-cell">Apellido Materno</th>
                                        <th scope="col" className="px-2 py-1 hidden md:table-cell">Cod Medidor</th>
                                        <th scope="col" className="px-2 py-1">N° Medidor</th>
                                        <th scope="col" className="px-2 py-1">Estado</th>
                                        <th scope="col" className="px-2 py-1 hidden md:table-cell">Dirección</th>
                                        <th scope="col" className="px-2 py-1">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, i) => (
                                        <tr key={i} className="odd:bg-gray-100 even:bg-white">
                                            <td className="py-1 px-2 hidden sm:table-cell">{item.codigoCliente}</td>
                                            <td className="py-1 px-2">{item.ci}</td>
                                            <td className="py-1 px-2">{item.nombre}</td>
                                            <td className="py-1 px-2">{item.apellidoPaterno}</td>
                                            <td className="py-1 px-2 hidden md:table-cell">{item.apellidoMaterno}</td>
                                            <td className="py-1 px-2 hidden md:table-cell">{item.codigo}</td>
                                            <td className="py-1 px-2">{item.numeroMedidor}</td>
                                            <td className={`py-1 px-2 text-white ${item.estado == EstadoMedidorE.activo ? 'bg-green-400' : item.estado == EstadoMedidorE.inactivo ? 'bg-red-400' : 'bg-amber-400'}`}>
                                                {item.estado}
                                            </td>
                                            <td className="py-1 px-2 hidden md:table-cell">{item.direccion}</td>
                                            <td className="py-1 px-2 flex space-x-1">
                                                {permisosMedidor.some((i) => i.includes(PermisosE.ELIMINAR_MEDIDOR)) && (
                                                    <button onClick={() => AlertaEliminar(() => eliminar(item._id))} className="text-red-500 text-lg p-1">
                                                        <MdDelete />
                                                    </button>
                                                )}
                                                {permisosMedidor.some((i) => i.includes(PermisosE.EDITAR_MEDIDOR)) && (
                                                    <button onClick={() => medidorId(item._id)} className="text-blue-500 text-lg p-1">
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

            {isOpen && medidor && <EditarMedidorModal recargar={recargar} setRecargar={setRecargar} closeModal={closeModal} isOpen={isOpen} medidor={medidor} />}
            {loading && <Loader />}
        </>
    );
};
