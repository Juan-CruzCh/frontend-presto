import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FormLecturaI } from "../interface/formLectura"
import { DataClienteI } from "../interface/dataCliente"
import { buscarMedidor } from "../../medidor/service/MedidorService"
import { crearLectura } from "../service/lecturaService"
import { HttpStatus } from "../../core/enums/httpStatus"
import { useNavigate } from "react-router"

import { AxiosError } from "axios"
import { ErrorConflictoI } from "../../core/interface/errorConflicto"
import { alertaConfirmacionLectura } from "../util/alertaConfrmacionLectura"
import { ErrorI } from "../../core/interface/error"
import { EstadoMedidorE } from "../../medidor/enum/estadoMedidor"
import { Loader } from "../../core/components/Loader"


export const RealizarLectura = () => {
    const navigate = useNavigate()
    const date = new Date()
    const [conflicto, setConflicto] = useState<string>()
    const [error, setError] = useState<string>()
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const [cliente, setCliente] = useState<DataClienteI | null>()
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormLecturaI>()
    const numeroMedidor = watch("numeroMedidor")
    const lecturaAnterior = watch("lecturaAnterior")
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setCliente(null)
        setValue("lecturaActual", 0)
        buscarMedidorCliente()
        setConflicto('')
        setError('')

    }, [numeroMedidor])

    useEffect(() => {

        if (cliente) {
            setValue("lecturaAnterior", Number(cliente.lecturaAnterior));
        } else {
            setValue("lecturaAnterior", 0)
        }
    }, [cliente, setValue]);
    const buscarMedidorCliente = async () => {
        try {
            if (numeroMedidor) {
                setLoading(true)
                const response = await buscarMedidor(numeroMedidor)
                setLoading(false)
                setCliente(response)

            }
        } catch (error) {
            console.log(error);

        }
    }
    const onSubmit = async (data: FormLecturaI) => {
        try {

            if (cliente) {
                const alerta = await alertaConfirmacionLectura()
                if (alerta) {
                    data.medidor = cliente._id
                    data.lecturaActual = Number(data.lecturaActual)
                    data.lecturaAnterior = Number(data.lecturaAnterior)
                    setLoading(true)
                    const response = await crearLectura(data)


                    if (response.status == HttpStatus.CREATED) {
                        setLoading(false)

                        navigate(`/lectura/recibo/${response.medidor}/${response.lectura}`)

                    }
                }



            }

        } catch (error) {
            setLoading(false)


            const e = error as AxiosError

            if (e.status == HttpStatus.CONFLICT) {
                const conflictoError = e.response?.data as ErrorConflictoI
                setConflicto(conflictoError.message)
            }
            if (e.status == HttpStatus.BAD_REQUEST) {
                const err = e.response?.data as ErrorI
                setError(err.message)
            }



        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="w-full sm:max-w-full md:max-w-4xl bg-white rounded-lg p-4 sm:p-2">
                <div className="bg-blue-500 text-white text-center py-4 rounded-t-lg">
                    <h5 className="text-lg sm:text-xl font-semibold">Registro de Lectura del Medidor de Agua</h5>
                </div>
                <div className="p-4 sm:p-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-6 col-span-2">
                                <label htmlFor="numeroMedidor" className="block text-gray-700 font-medium">Numero de Medidor</label>
                                <input
                                    {...register("numeroMedidor", {
                                        validate: (value: string) => {
                                            if (!value) {
                                                return "Ingrese el N° de medidor"
                                            }
                                            return true
                                        }
                                    })}
                                    type="text"
                                    id="numeroMedidor"
                                    placeholder="Ingrese el código del medidor"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                                {errors.numeroMedidor && <p className='text-xs text-red-500'>{errors.numeroMedidor.message}</p>}
                            </div>

                            <div className="mb-6 col-span-2">
                                {cliente && (
                                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 text-justify">
                                        <div className="p-4 bg-white rounded-lg shadow-md">
                                            <p className="font-semibold text-lg text-blue-600 mb-2">Datos del Cliente</p>
                                            <p><strong className="text-gray-800">Código Cliente:</strong> <span className="text-gray-600">{cliente.codigoCliente}</span></p>
                                            <p><strong className="text-gray-800">CI:</strong> <span className="text-gray-600">{cliente.ci}</span></p>
                                            <p><strong className="text-gray-800">Nombre Completo:</strong> <span className="text-gray-600">{cliente.nombre} {cliente.apellidoPaterno} {cliente.apellidoMaterno}</span></p>
                                            <p><strong className="text-gray-800">Dirección:</strong> <span className="text-gray-600">{cliente.direccion}</span></p>
                                        </div>
                                        <div className="p-4 bg-white rounded-lg shadow-md">
                                            <p className="font-semibold text-lg text-blue-600 mb-2">Datos del Medidor</p>
                                            <p><strong className="text-gray-800">Estado:</strong> <span className={`text-gray-600  ${cliente.estado == EstadoMedidorE.inactivo && 'bg-red-700 text-white p-1 rounded-2xl'}`}>{cliente.estado}</span></p>
                                            <p><strong className="text-gray-800">Número de Medidor:</strong> <span className="text-gray-600">{cliente.numeroMedidor}</span></p>
                                            <p><strong className="text-gray-800">Código Medidor:</strong> <span className="text-gray-600">{cliente.codigo}</span></p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-6 col-span-2">
                                <label htmlFor="mes" className="block text-gray-700 font-medium mb-2">Mes</label>
                                <select
                                    {...register("mes", { required: 'Seleccione un mes' })}
                                    defaultValue={meses[date.getMonth()]}
                                    name="mes"
                                    id="mes"
                                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {meses.map((item, index) => (
                                        <option key={index} value={item} className="text-gray-700">{item}</option>
                                    ))}
                                </select>
                                {errors.mes && <p className='text-xs text-red-500'>{errors.mes.message}</p>}
                            </div>

                            <div className="mb-6 col-span-2">
                                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="lecturaAnterior" className="block text-gray-700 font-medium"> Lectura Anterior m³</label>
                                        <input
                                            {...register("lecturaAnterior", {
                                                valueAsNumber: true,
                                                validate: (value: number) => {
                                                    if (!value || value <= 0) {
                                                        return "Ingrese la lectura anterior"
                                                    }

                                                    return true
                                                }
                                            })}
                                            type="number"
                                            id="lecturaAnterior"
                                            placeholder="Ingrese la lectura anterior"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        />
                                        {errors.lecturaAnterior && <p className='text-xs text-red-500'>{errors.lecturaAnterior.message}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lecturaActual" className="block text-gray-700 font-medium">Lectura Actual m³</label>
                                        <input
                                            {...register("lecturaActual", {
                                                valueAsNumber: true,
                                                validate: (value: number) => {
                                                    if (!value || value <= 0) {
                                                        return "Ingrese la lectura actual"
                                                    }
                                                    if (value < lecturaAnterior) {
                                                        return "Ingrese las lecturas correctas"
                                                    }
                                                    return true
                                                }
                                            })}
                                            type="number"
                                            id="lecturaActual"
                                            placeholder="Ingrese la lectura actual"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                        />
                                        {errors.lecturaActual && <p className='text-xs text-red-500'>{errors.lecturaActual.message}</p>}
                                    </div>
                                </div>
                                {conflicto && <p className='text-xs text-red-500'>{conflicto}</p>}
                                {error && <p className='text-xs text-red-500'>{error}</p>}
                            </div>

                        </div>
                        <div className="text-center mt-6">
                            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {loading && <Loader />}
        </div>


    )
}
