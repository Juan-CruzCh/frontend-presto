import { useEffect, useState } from "react";
import { ClienteI } from "../interface/cliente";
import { listarClientes } from "../services/clienteService";
import { IoIosAddCircle } from "react-icons/io";
import { BuscadorCliente } from "../components/BuscadorCliente";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { Paginador } from "../../core/components/Paginador";
import { HttpStatus } from "../../core/enums/httpStatus";
import { Loader } from "../../core/components/Loader";

export const ClientesModal = ({ setCliente }: { setCliente: (cliete: ClienteI) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [data, setData] = useState<ClienteI[]>([])
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const [nombre, setNombre] = useState<string>('')
    const [ci, setCi] = useState<string>('')
    const [codigo, setCodigo] = useState<string>('')
    const [apellidoPaterno, setApellidoPaterno] = useState<string>('')
    const [apellidoMaterno, setApellidoMaterno] = useState<string>('')
    useEffect(() => {
        if (isOpen == true) {
            listar()
        }
    }, [limite, pagina, nombre, apellidoMaterno, ci, codigo, apellidoPaterno, isOpen])

    const listar = async () => {
        try {
            setLoading(true)
            const response = await listarClientes(limite,
                pagina, codigo,
                ci, apellidoMaterno,
                apellidoPaterno,
                nombre)
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

    return (
        <div className="p-4">
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={openModal}
            >
                Buscar cliente
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>

                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-350 max-w-full max-h-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Lista de clientes </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4 overflow-auto max-h-[400px]">
                            <BuscadorCliente setApellidoMaterno={setApellidoMaterno}
                                setApellidoPaterno={setApellidoPaterno}
                                setCi={setCi}
                                setCodigo={setCodigo}
                                setNombre={setNombre}

                            />
                            <ItemsPagina limite={setLimite} />
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="min-w-full table-auto">
                                    <thead className="sticky top-0 bg-gray-200">
                                        <tr className="bg-gray-700 text-white text-left text-sm">
                                            <th className="py-2 px-4">Cod</th>
                                            <th className="py-2 px-4">Ci</th>
                                            <th className="py-2 px-4">Nombre</th>
                                            <th className="py-2 px-4">Apellido Paterno</th>
                                            <th className="py-2 px-4">Apellido Materno</th>
                                            <th className="py-2 px-4">Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <tr className=" text-sm" key={item._id}>
                                                <td className="py-2 px-4">{item.codigo}</td>
                                                <td className="py-2 px-4">{item.ci}</td>
                                                <td className="py-2 px-4">{item.nombre}</td>
                                                <td className="py-2 px-4">{item.apellidoPaterno}</td>
                                                <td className="py-2 px-4">{item.apellidoMaterno}</td>
                                                <td className="py-2 px-4">
                                                    <button
                                                        onClick={() => {
                                                            const cliente: ClienteI = {
                                                                _id: item._id,
                                                                apellidoMaterno: item.apellidoMaterno,
                                                                apellidoPaterno: item.apellidoPaterno,
                                                                celular: item.celular,
                                                                ci: item.ci,
                                                                codigo: item.codigo,
                                                                nombre: item.nombre
                                                            };
                                                            setCliente(cliente);
                                                            setIsOpen(false);
                                                        }}
                                                        className="text-blue-500 hover:text-blue-700 text-2xl"
                                                    >
                                                        <IoIosAddCircle />
                                                    </button>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
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

            {loading && <Loader />}
        </div>

    );
};