import { useContext, useEffect, useState } from "react"
import { descargarExcelMedidoresConTresLecturasPendientes, listarMedidoresConTresLecturasPendientes, realizarCorte } from "../service/MedidorService"
import { Paginador } from "../../core/components/Paginador"

import { ItemsPagina } from "../../core/components/ItemsPAgina"
import { PermisosContext } from "../../autenticacion/context/PermisosContext"
import { MedidorCorteI } from "../interface/MedidoresCorte"
import { HttpStatus } from "../../core/enums/httpStatus"

import { alertaConfirmacion } from "../../core/util/alertaConfirmacion"
import { Loader } from "../../core/components/Loader"
import { PermisosE } from "../../core/enums/permisos"
import toast from "react-hot-toast"
import { ButtonDescargarExcel } from "../../core/components/ButtonDescargarExcel"
import { v4 } from "uuid"

export const ListarCorteMedidor = () => {
    const { permisosMedidor } = useContext(PermisosContext)
    const [data, setData] = useState<MedidorCorteI[]>([]);
    const [pagina, setPagina] = useState<number>(1)
    const [limite, setLimite] = useState<number>(20)
    const [paginas, setPaginas] = useState<number>(1)
    const [recargar, setRecargar] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);


    useEffect(() => { listarMedidor() }, [recargar, limite, pagina])

    const listarMedidor = async () => {
        try {
            setLoading(true)
            const response = await listarMedidoresConTresLecturasPendientes(limite, pagina)
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

    const corte = async (id: string) => {
        try {

            const alerta = await alertaConfirmacion()


            if (alerta) {
                setLoading(true)
                const response = await realizarCorte(id)
                if (response.status == HttpStatus.OK) {
                    toast.success('Corte realizado')
                    setLoading(false)
                    setRecargar(!recargar)
                }
            }
        } catch (error) {
            console.log(error);

            setLoading(false)
        }
    }
    const descargarExcel = async () => {
        try {
            setLoading(true)
            const response = await descargarExcelMedidoresConTresLecturasPendientes()
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
            <ItemsPagina limite={setLimite} />
            <ButtonDescargarExcel onClick={descargarExcel} />
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded-lg shadow-lg text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-gray-700 text-white text-left">
                                    <th scope="col" className="px-2 py-1 hidden sm:table-cell">Cod Medidor</th>
                                    <th scope="col" className="px-2 py-1">N° Medidor</th>
                                    <th scope="col" className="px-2 py-1">Estado</th>
                                    <th scope="col" className="px-2 py-1">Dirección</th>
                                    <th scope="col" className="px-2 py-1">Lecturas pendientes</th>
                                    <th scope="col" className="px-2 py-1">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr key={i} className="odd:bg-gray-100 even:bg-white">
                                        <td className="py-1 px-2 hidden sm:table-cell">{item.codigo}</td>
                                        <td className="py-1 px-2">{item.numeroMedidor}</td>
                                        <td className="py-1 px-2">{item.estado}</td>
                                        <td className="py-1 px-2">{item.direccion}</td>
                                        <td className="py-1 px-2">{item.lecturas.length}</td>
                                        <td className="py-1 px-2">
                                            {permisosMedidor.some((i) => i.includes(PermisosE.EDITAR_MEDIDOR)) && <button onClick={() => corte(item._id)} className="p-1 sm:p-2 bg-red-500 rounded-lg text-white text-xs sm:text-sm">
                                                Realizar corte
                                            </button>}
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



    )
}
