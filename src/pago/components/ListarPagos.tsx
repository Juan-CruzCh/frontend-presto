import { useEffect, useState } from "react";
import { BuscadorPagos } from "./BuscadorPagos";
import { descargarLosPagosExcel, listarTodosLosPagos } from "../service/pagoService";
import { ListarPagosI } from "../interface/listarPagos";
import { BuscadorPagosI } from "../interface/buscadorPagos";
import { ItemsPagina } from "../../core/components/ItemsPAgina";
import { Paginador } from "../../core/components/Paginador";
import { HttpStatus } from "../../core/enums/httpStatus";
import { useNavigate } from "react-router";
import { Loader } from "../../core/components/Loader";
import { v4 } from 'uuid'

import { ButtonDescargarExcel } from "../../core/components/ButtonDescargarExcel";

export const ListarPagos = () => {
    const [loading, setLoading] = useState(false);
    const date = new Date()
    const fecha = date.toISOString().split('T')[0]
    const navigate = useNavigate()
    const [data, setData] = useState<ListarPagosI[]>([]);
    const [buscador, setBuscador] = useState<BuscadorPagosI>({
        ci: null,
        numeroMedidor: null,
        apellidoMaterno: null,
        apellidoPaterno: null,
        nombre: null,
        fechaFin: fecha,
        fechaInicio: fecha
    });


    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    useEffect(() => {
        listarPagos()
    }, [buscador, limite, pagina])

    const listarPagos = async () => {
        try {
            setLoading(true)
            const response = await listarTodosLosPagos(buscador, limite, pagina)
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
    const descargarPagosExcel = async () => {

        try {
            setLoading(true)
            const response = await descargarLosPagosExcel(buscador)
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


        <div className="flex flex-col overflow-x-auto">
            <BuscadorPagos onSubmit={setBuscador} />
            <ItemsPagina limite={setLimite} />
            <ButtonDescargarExcel onClick={descargarPagosExcel} />
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-start text-xs sm:text-sm font-light text-surface border border-gray-300 rounded-lg shadow-lg">
                            <thead className="border-b border-neutral-200 font-medium bg-gray-700 text-white">
                                <tr>
                                    <th className="py-1 px-2 hidden md:table-cell">Cod Cliente</th>
                                    <th className="py-1 px-2">CI</th>
                                    <th className="py-1 px-2">Nombre</th>
                                    <th className="py-1 px-2">Apellidos</th>
                                    <th className="py-1 px-2 hidden md:table-cell">Cod Medidor</th>
                                    <th className="py-1 px-2 hidden md:table-cell">N° Medidor</th>
                                    <th className="py-1 px-2">Lect. Ant</th>
                                    <th className="py-1 px-2">Lect. Act</th>
                                    <th className="py-1 px-2">Cons (m³)</th>
                                    <th className="py-1 px-2 hidden md:table-cell">Monto</th>
                                    <th className="py-1 px-2">Pagado</th>
                                    <th className="py-1 px-2 hidden md:table-cell">Mes</th>
                                    <th className="py-1 px-2 hidden md:table-cell">Estado</th>
                                    <th className="py-1 px-2">Tarifa</th>
                                    <th className="py-1 px-2 hidden md:table-cell">Recibo</th>
                                    <th className="py-1 px-2 hidden md:table-cell">Fecha</th>
                                    <th className="py-1 px-2 ">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index} className="odd:bg-gray-100 even:bg-white">
                                        <td className="py-1 px-2 hidden md:table-cell">{item.codigoCliente}</td>
                                        <td className="py-1 px-2">{item.ci}</td>
                                        <td className="py-1 px-2">{item.nombre}</td>
                                        <td className="py-1 px-2">{item.apellidoPaterno} {item.apellidoMaterno}</td>
                                        <td className="py-1 px-2 hidden md:table-cell">{item.codigoMedidor}</td>
                                        <td className="py-1 px-2 hidden md:table-cell">{item.numeroMedidor}</td>
                                        <td className="py-1 px-2">{item.lecturaAnterior}</td>
                                        <td className="py-1 px-2">{item.lecturaActual}</td>
                                        <td className="py-1 px-2">{item.consumoTotal}</td>
                                        <td className="py-1 px-2 hidden md:table-cell">{item.costoApagar}</td>
                                        <td className="py-1 px-2">{item.costoPagado}</td>
                                        <td className="py-1 px-2 hidden md:table-cell">{item.mes}</td>
                                        <td className="py-1 px-2 hidden md:table-cell">{item.estado}</td>
                                        <td className="py-1 px-2">{item.tarifa}</td>
                                        <td className="py-1 px-2 hidden md:table-cell">{item.numeroPago}</td>
                                        <td className="py-1 px-2 hidden md:table-cell">{item.fecha}</td>
                                        <td className="py-1 px-2">
                                            <button onClick={() => navigate(`/pago/imprimir/cliente/${item.medidor}`)} className="bg-green-600 p-1 rounded text-white text-xs sm:text-sm">
                                                Recibo
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Paginador paginaActual={pagina} paginaSeleccionada={setPagina} paginas={paginas} />
                    </div>
                </div>
            </div>
            {loading && <Loader />}
        </div>


    );
}


