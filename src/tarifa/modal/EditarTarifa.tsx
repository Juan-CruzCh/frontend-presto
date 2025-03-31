import { useEffect, useState } from "react";
import { editarTarifa, tarifaPorId } from "../service/tarifasService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { useForm } from "react-hook-form";
import { FormTarifaI } from "../interface/formTarifa";
import toast from "react-hot-toast";
import { Loader } from "../../core/components/Loader";
import { AxiosError } from "axios";
import { ErrorI } from "../../core/interface/error";

export const EditarTarifa = ({ tarifa, closeModal, isOpen, recargar, setRecargar }: {
    tarifa: string,
    closeModal: () => void, isOpen: boolean,
    recargar: boolean,
    setRecargar: (recargar: boolean) => void
}) => {
    const [loading, setLoading] = useState(false);
    const [conflicto, setConflicto] = useState<string>();
    useEffect(() => {
        if (isOpen) {
            tarifaId()
        }
    }, [isOpen])
    const { handleSubmit, register, formState: { errors }, setValue } = useForm<FormTarifaI>()

    const tarifaId = async () => {
        try {
            setLoading(true)
            const response = await tarifaPorId(tarifa)


            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setValue("nombre", response.data.nombre)

            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }

    const onSubmit = async (data: FormTarifaI) => {
        try {

            setLoading(true)
            const response = await editarTarifa(tarifa, data.nombre)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                toast.success('Tarifa editada')
                closeModal()
                setRecargar(!recargar)
            }
        } catch (error) {
            setLoading(false)
            setLoading(false)
            const e = error as AxiosError
            const er = e.response?.data as ErrorI

            if (e.response?.status == HttpStatus.CONFLICT) {
                setConflicto(er.message)

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
                            <h2 className="text-xl font-semibold">Editar tarifa</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="col-span-2 sm:col-span-2">
                                    <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        {...register("nombre", {
                                            validate: (value: string) => {
                                                if (!value) {
                                                    return "Ingrese el nombre de la tarifa"
                                                }
                                                return true

                                            }
                                        })}

                                        type="text"
                                        {...register("nombre")}
                                        id="nombre"
                                        name="nombre"
                                        placeholder="Ingresa tu nombre"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                    {errors.nombre && <p className='text-xs text-red-500'>{errors.nombre.message}</p>}
                                    {conflicto && <p className='text-xs text-red-500'>{conflicto}</p>}
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition-colors"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            )}

            {loading && <Loader />}
        </div>
    );
};

