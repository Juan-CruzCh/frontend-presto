import { useEffect, useState } from "react";
import { listarPagosCliente } from "../service/pagoService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { dataReciboPago } from "../interface/dataReciboPago";
import { IoIosPrint } from "react-icons/io";
import { Loader } from "../../core/components/Loader";

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const ReciboPagoCliente = ({ medidor }: { medidor: string }) => {
    const [dataCliente, setDataCliente] = useState<dataReciboPago>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        pagos();
    }, []);

    const pagos = async () => {
        try {
            if (medidor) {
                setLoading(true)
                const response = await listarPagosCliente(medidor);
                if (response.status === HttpStatus.OK) {
                    setLoading(false)
                    setDataCliente(response);
                }
            }
        } catch (error) {
            setLoading(false)
            console.error("Error al listar pagos:", error);
        }
    };



    return (
        <>
            {dataCliente && (
                <div
                    id="recibo"
                    className="w-[210mm] h-[230mm] p-4 bg-white text-black mx-auto "
                >
                    <header>
                        <h2 className="text-center font-extrabold text-2xl">
                            ASOCIACIÓN DE AGUA POTABLE Y SANEAMIENTO BASICO
                        </h2>
                        <h3 className="text-center font-bold text-xl mt-1">
                            "APÓSTOL SANTIAGO DE PRESTO"
                        </h3>
                        <h4 className="text-center font-semibold text-lg mt-1">
                            "A.A.P.S.B.A.S.P"
                        </h4>
                    </header>

                    <section className="mt-8 flex justify-between text-base">
                        <div>
                            <p>
                                <strong>Número y Apellidos:</strong> {dataCliente.cliente.nombre}{" "}
                                {dataCliente.cliente.apellidoPaterno} {dataCliente.cliente.apellidoMaterno}
                            </p>
                            <p>
                                <strong>Dirección:</strong> {dataCliente.cliente.direccion}
                            </p>
                        </div>
                        <div className="text-right">
                            <p>
                                <strong>No. de Medidor:</strong> {dataCliente.cliente.numeroMedidor}
                            </p>
                            <p>
                                <strong>No. de Socio:</strong> {dataCliente.cliente.ci}
                            </p>
                        </div>
                    </section>

                    <section className="mt-8">
                        <h3 className="text-center font-bold text-xl">RECIBO DE PAGO</h3>
                    </section>


                    <table className="w-full border-collapse border border-black">
                        <thead className="bg-gray-200">
                            <tr className="border border-black">
                                <th className="border border-black p-2">Mes</th>
                                <th className="border border-black p-2">Año</th>
                                <th className="border border-black p-2" colSpan={2}>
                                    Lectura
                                    <div className="flex justify-between text-xs">
                                        <span>Ant</span>
                                        <span>Act</span>
                                    </div>
                                </th>
                                <th className="border border-black p-2">m³</th>
                                <th className="border border-black p-2">Total</th>
                                <th className="border border-black p-2">Fecha</th>
                                <th className="border border-black p-2">Observaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meses.map((mes, index) => {
                                const pago = dataCliente.pagos.find(
                                    (item) => item.mes.toLowerCase() === mes.toLowerCase()
                                );
                                return (
                                    <tr key={index} className="border border-black">
                                        <td className="border border-black p-2">{mes}</td>
                                        <td className="border border-black p-2">{pago?.gestion}</td>
                                        <td className="border border-black p-2">{pago?.lecturaAnterior}</td>
                                        <td className="border border-black p-2">{pago?.lecturaActual}</td>
                                        <td className="border border-black p-2">{pago?.consumoTotal}</td>
                                        <td className="border border-black p-2">{pago?.costoPagado}</td>
                                        <td className="border border-black p-2">{pago?.fecha}</td>
                                        <td className="border border-black p-2">{pago?.observaciones}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="bg-gray-200">
                            <tr>
                                <td colSpan={4} className="border border-black p-2 text-right">
                                    Total
                                </td>
                                <td className="border border-black p-2">Bs</td>
                                <td className="border border-black p-2">
                                    {dataCliente.pagos.reduce((acc, item) => item.costoPagado + acc, 0).toFixed(2)}
                                </td>
                                <td colSpan={2} className="border border-black p-2"></td>
                            </tr>
                        </tfoot>
                    </table>


                    <footer className="mt-10 flex justify-between text-sm">
                        <div className="text-center">
                            <p>_________________________</p>
                            <p>Razón Conforme</p>
                            <p>Secretario de Hacienda</p>
                            <p>ASOCIACIÓN</p>
                        </div>
                        <div className="text-center">
                            <p>_________________________</p>
                            <p>Entrega Conforme</p>
                            <p>SOCIO (FIRMA)</p>
                        </div>
                    </footer>
                </div>

            )}

            <div className="text-center mt-5">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded text-3xl hover:bg-blue-700"
                    onClick={imprimir}
                >
                    <IoIosPrint />
                </button>
            </div>

            {loading && <Loader />}
        </>

    );
};



const imprimir = () => {
    const content = document.getElementById("recibo");
    if (content) {
        const printWindow = window.open("width=800,height=900");

        const styles = [...document.styleSheets]
            .map((styleSheet) => {
                try {
                    return [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
                } catch (e) {
                    return "";
                }
            })
            .join("");

        if (printWindow) {
            printWindow.document.write(`
            <html>
                <head>
                    <style>${styles}</style>
                </head>
                <body class="bg-white text-black p-10">
                    ${content.outerHTML}
                </body>
            </html>
        `);

            printWindow.document.close();
            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            };
        }

    }
};
