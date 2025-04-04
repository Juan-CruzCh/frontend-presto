import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormClienteI } from "../interface/formCliente";
import { clienteId, editarCliente } from "../services/clienteService";
import { HttpStatus } from "../../core/enums/httpStatus";

import { AxiosError } from "axios";
import { ErrorConflictoI } from "../../core/interface/errorConflicto";
import toast from "react-hot-toast";
import { Loader } from "../../core/components/Loader";

export const EditarClienteModal = ({ cliente, closeModal, isOpen, recargar, setRecargar }: {
    cliente: string,
    closeModal: () => void
    isOpen: boolean
    recargar: boolean,
    setRecargar: (recargar: boolean) => void
}) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormClienteI>()
    const [mensaje, setMensaje] = useState<string>()


    useEffect(() => {
        clienteOne()
    }, [isOpen])


    const clienteOne = async () => {
        try {
            setLoading(true)
            const response = await clienteId(cliente)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setValue("ci", response.data.ci)
                setValue("nombre", response.data.nombre)
                setValue("apellidoPaterno", response.data.apellidoPaterno)
                setValue("apellidoMaterno", response.data.apellidoMaterno)
                setValue("celular", response.data.celular)
            }

        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }


    const onSubmit = async (data: FormClienteI) => {
        try {
            setLoading(true)
            const response = await editarCliente(cliente, data)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                toast.success('Editado')
                setRecargar(!recargar)
                closeModal()
            }

        } catch (error) {
            setLoading(false)
            const e = error as AxiosError
            if (e.status == HttpStatus.CONFLICT) {
                const conflicto = e.response?.data as ErrorConflictoI
                console.log(conflicto);

                setMensaje(conflicto.message)
            }


        }

    }
    return (
        <div className="p-4">




            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>


                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Cliente</h2>

                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                                {/* CI */}
                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">CI</label>
                                    <input
                                        {...register("ci", {
                                            validate: (value: string) => {
                                                if (!value) {
                                                    return "Ingrese el N° de carnet"
                                                }
                                                return true
                                            }
                                        })}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Ingrese su CI"
                                    />
                                    {errors.ci && <p className='text-xs text-red-500'>{errors.ci.message}</p>}
                                    {mensaje && <p className='text-xs text-red-500'>{mensaje}</p>}
                                </div>

                                {/* Nombre */}
                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">Nombre</label>
                                    <input
                                        {...register("nombre", {
                                            validate: (value: string) => {
                                                if (!value) {
                                                    return "Ingrese el nombre"
                                                }
                                                return true
                                            }
                                        })}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Ingrese su nombre"
                                    />
                                    {errors.nombre && <p className='text-xs text-red-500'>{errors.nombre.message}</p>}
                                </div>

                                {/* Apellido Paterno y Apellido Materno */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-600 text-sm font-medium mb-1">Apellido Paterno</label>
                                        <input
                                            {...register("apellidoPaterno",
                                                {
                                                    validate: (value: string) => {
                                                        if (!value) {
                                                            return "Ingrese el apellido paterno"
                                                        }
                                                        return true
                                                    }
                                                }
                                            )}
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Apellido Paterno"
                                        />
                                        {errors.apellidoPaterno && <p className='text-xs text-red-500'>{errors.apellidoPaterno.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-gray-600 text-sm font-medium mb-1">Apellido Materno</label>
                                        <input
                                            {...register("apellidoMaterno")}
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            placeholder="Apellido Materno"
                                        />
                                    </div>
                                </div>



                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1">Celular</label>
                                    <input
                                        {...register("celular")}
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Ingrese el N° celular"
                                    />
                                </div>

                                {/* Botón de Enviar */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    Registrar Cliente
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            )}
            {loading && <Loader />}
        </div>
    );
};