
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { EditarRangoI } from "../interface/editarRango";
import { editarRango, rangoPorId } from "../service/tarifasService";
import { HttpStatus } from "../../core/enums/httpStatus";
import toast from "react-hot-toast";
import { Loader } from "../../core/components/Loader";

export const EditarRangoModal = ({ rango, closeModal, isOpen, recargar, setRecargar }: {
    rango: string,
    closeModal: () => void, isOpen: boolean,
    recargar: boolean,

    setRecargar: (recargar: boolean) => void
}) => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (isOpen) {
            rangoId()
        }
    }, [isOpen])

    const { handleSubmit, register, formState: { errors }, setValue } = useForm<EditarRangoI>()

    const rangoId = async () => {
        try {
            setLoading(true)
            const response = await rangoPorId(rango)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setValue("costo", response.data.costo)
                setValue("rango2", response.data.rango2)
                setValue("rango1", response.data.rango1)
                setValue("iva", response.data.iva)

            }
        } catch (error) {
            setLoading(false)

            console.log(error);

        }
    }

    const onSubmit = async (data: EditarRangoI) => {
        try {
            setLoading(true)
            const response = await editarRango(rango, data)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                toast.success('Rango editado')
                closeModal()
                setRecargar(!recargar)
            }

        } catch (error) {
            setLoading(false)
            console.log(error);


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
                            <h2 className="text-xl font-semibold">Editar Rango</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="">
                                    <label htmlFor="rango1" className="block text-gray-700 font-bold mb-2">
                                        Rango 1
                                    </label>
                                    <input
                                        {...register("rango1", { valueAsNumber: true, required: 'Ingrese el rango 1' })}
                                        type="number"
                                        id="rango1"
                                        name="rango1"
                                        placeholder="Ingresa el valor del rango 1"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                    {errors.rango1 && <p className="text-xs text-red-500">{errors.rango1.message}</p>}
                                </div>

                                <div className="">
                                    <label htmlFor="rango2" className="block text-gray-700 font-bold mb-2">
                                        Rango 2
                                    </label>
                                    <input
                                        {...register("rango2", { valueAsNumber: true, required: 'Ingrese el rango 2' })}
                                        type="number"
                                        id="rango2"
                                        name="rango2"
                                        placeholder="Ingresa el valor del rango 2"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                    {errors.rango2 && <p className="text-xs text-red-500">{errors.rango2.message}</p>}
                                </div>

                                <div className="">
                                    <label htmlFor="costo" className="block text-gray-700 font-bold mb-2">
                                        Costo
                                    </label>
                                    <input
                                        {...register("costo", { valueAsNumber: true, required: 'Ingrese el costo' })}
                                        type="number"
                                        id="costo"
                                        name="costo"
                                        step="any"
                                        placeholder="Ingresa el costo"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                    {errors.costo && <p className="text-xs text-red-500">{errors.costo.message}</p>}
                                </div>


                                <div className="col-span-2 sm:col-span-1">

                                    <label htmlFor="iva" className="block text-gray-700 font-bold mb-2">
                                        iva %
                                    </label>
                                    <input
                                        {...register("iva", {
                                            valueAsNumber: true,
                                            validate: (valuen: number) => {
                                                if (valuen < 0) {
                                                    return "Ingrese el iva"
                                                }
                                                return true
                                            }

                                        })}
                                        type="number"
                                        id="iva"
                                        name="iva"
                                        step="any"
                                        defaultValue={0}
                                        placeholder="Ingresa el iva"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    />
                                    {errors.iva && <p className='text-xs text-red-500'>{errors.iva.message}</p>}
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

