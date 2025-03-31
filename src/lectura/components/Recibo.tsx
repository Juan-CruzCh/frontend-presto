import { useEffect, useState } from "react";
import { lecturaRecibo } from "../service/lecturaService";
import { LecturasReciboI, ReciboDataI } from "../interface/reciboData";
import { HttpStatus } from "../../core/enums/httpStatus";
import { EstadoPagoE } from "../../pago/enum/estadoPago";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { v6 } from 'uuid'
import '../css/recibo.css'
import { Loader } from "../../core/components/Loader";
import { formateaFecha } from "../../core/util/formatearFecha";
export const Recibo = ({ medidor, lectura }: { medidor: string, lectura: string }) => {
    const [dataRecibo, setDataRecibo] = useState<ReciboDataI>()
    const [lecturas, setLecturas] = useState<LecturasReciboI[]>([])
    const [lecturaSeleccionada, setLecturaSeleccionada] = useState<LecturasReciboI>()
    const [loading, setLoading] = useState(false);
    const generarPdf = async () => {
        const ids = v6()
        const html = document.getElementById('recibo')
        if (html) {

            const ancho: number = 104
            const canvas = await html2canvas(html, { logging: true, scale: 2 })
            const alto = canvas.height * ancho / canvas.width
            const imgData = canvas.toDataURL('img/png')
            const pdf = new jsPDF({
                unit: 'mm',
                format: [ancho, alto]
            })
            pdf.addImage(imgData, 'png', 0, 0, ancho, alto)
            pdf.save(`${ids}.pdf`)

        }
    };



    useEffect(() => {
        recibo()

    }, [])

    const recibo = async () => {
        try {
            if (medidor) {
                setLoading(true)
                const response = await lecturaRecibo(medidor, lectura)
                if (response.status == HttpStatus.OK) {
                    setLoading(false)
                    setDataRecibo(response.data.dataCliente)
                    setLecturas(response.data.lecturas)
                    setLecturaSeleccionada(response.data.lectura)
                }


            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }


    return (
        <>{dataRecibo &&
            <div className="flex justify-center items-center h-screen">
                <div className="recibo-container" id="recibo">

                    <div className="recibo-header">
                        <h2>A.A.P.S.A.S</h2>
                        <p>Empresa Local de Agua Potable Presto</p>
                    </div>
                    <div className="linea" ></div>
                    <div className="recibo-info">
                        <p><span>Código Cliente:</span> {dataRecibo.codigoCliente}</p>
                        <p><span>Nro Medidor:</span> {dataRecibo.numeroMedidor}</p>
                    </div>
                    <div></div>
                    <div className="recibo-datos">
                        <p><span>Nombre:</span> {`${dataRecibo.nombre} ${dataRecibo.apellidoPaterno} ${dataRecibo.apellidoMaterno}`}</p>
                        <p><span>Dirección:</span> {dataRecibo.direccion}</p>
                        <p><span>Categoría:</span> {dataRecibo.tarifaNombre}</p>
                        <p><span>Fecha de lectura:</span> {lecturaSeleccionada?.fecha && formateaFecha(lecturaSeleccionada?.fecha)}</p>
                        <p><span>Fecha de vencimiento:</span> {lecturaSeleccionada?.fechaVencimiento && formateaFecha(lecturaSeleccionada?.fechaVencimiento)}</p>
                    </div>
                    <div className="linea" ></div>

                    <div className="recibo-pagos">
                        <h3>Historial de Pagos</h3>
                        <div className="recibo-tabla">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mes</th>
                                        <th colSpan={2}>
                                            <div style={{ textAlign: "center", fontWeight: "bold" }}>Lectura</div>
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                                <span style={{ textAlign: "left" }}>Ant</span>
                                                <span style={{ textAlign: "right" }}>Act</span>
                                            </div>
                                        </th>
                                        <th>m³</th>
                                        <th>Imp</th>
                                        <th>Estado</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {lecturas.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.mes}</td>
                                            <td>{item.lecturaAnterior}</td>
                                            <td>{item.lecturaActual}</td>
                                            <td>{item.consumoTotal}</td>
                                            <td>{item.costoApagar}</td>
                                            <td>{item.estado}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={4}>Total</td>
                                        <td colSpan={2}>
                                            {lecturas
                                                .filter((item) => item.estado === EstadoPagoE.PENDIENTE)
                                                .reduce((acc, item) => acc + item.costoApagar, 0).toFixed(1)} Bs
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                    </div>
                </div>
            </div>




        }
            <div className="mt-4 text-center">
                <button
                    onClick={generarPdf}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Imprimir Recibo
                </button>
            </div>

            {loading && <Loader />}
        </>
    );
};
