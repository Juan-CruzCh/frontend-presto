import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormGastoI } from "../interface/formGasto";
import { editarGasto, gastoOne } from "../service/gastoService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { listarCategoriaGastoPublico } from "../../categoriaGasto/service/categoriaGastoService";
import { CategoriaGastoI } from "../../categoriaGasto/interface/categoriaGasto";
import toast from "react-hot-toast";
import { Loader } from "../../core/components/Loader";


export const EditarGastoModal = ({ recargar, setRecargar, gasto, closeModal, isOpen }:
    { gasto: string, recargar: boolean, setRecargar: (recargar: boolean) => void, closeModal: () => void, isOpen: boolean }) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormGastoI>()
    const [categoriaGastos, setCategoriaGastos] = useState<CategoriaGastoI[]>([])
    const [loading, setLoading] = useState(false);


    const onsubmit = async (data: FormGastoI) => {
        try {
            data.costoUnitario = Number(data.costoUnitario)
            data.cantidad = Number(data.cantidad)
            data.factorValides = Number(data.factorValides)
            setLoading(true)
            const response = await editarGasto(data, gasto)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                toast.success('Editado')
                setRecargar(!recargar)
                closeModal()
            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }

    useEffect((

    ) => {
        if (isOpen) {
            listarGastoOne()
            categoriaGasto()
        }
    }, [])

    const listarGastoOne = async () => {
        try {
            const response = await gastoOne(gasto)
            if (response.status == HttpStatus.OK) {
                setValue("cantidad", response.data.cantidad)
                setValue("descripcion", response.data.descripcion)
                setValue("unidadManejo", response.data.unidadManejo)
                setValue("categoriaGasto", response.data.categoriaGasto)
                setValue("costoUnitario", response.data.costoUnitario)
                setValue("factorValides", response.data.factorValides)
            }
        } catch (error) {
            console.log(error);

        }
    }


    const categoriaGasto = async () => {
        try {
            const response = await listarCategoriaGastoPublico()
            setCategoriaGastos(response)
        } catch (error) {
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

                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-4xl">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Editar gastos</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit(onsubmit)}>
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium">Descripción</label>
                                        <textarea
                                            {...register("descripcion", { required: 'Ingrese la descripcion' })}
                                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                                        />
                                        {errors.descripcion && <p className="text-red-500 text-xs">{errors.descripcion.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium">Unidad de manejo</label>
                                        <input
                                            {...register("unidadManejo", { required: 'Ingrese la unidad de manejo' })}
                                            type="text"
                                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                                        />
                                        {errors.unidadManejo && <p className="text-red-500 text-xs">{errors.unidadManejo.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium">Cantidad</label>
                                        <input
                                            {...register("cantidad", { required: 'Ingrese la cantidad', valueAsNumber: true })}
                                            type="number"
                                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                                        />
                                        {errors.cantidad && <p className="text-red-500 text-xs">{errors.cantidad.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium">Costo Unitario</label>
                                        <input
                                            {...register("costoUnitario", { required: 'Ingrese el costo unitario', valueAsNumber: true })}
                                            type="number"
                                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                                        />
                                        {errors.costoUnitario && <p className="text-red-500 text-xs">{errors.costoUnitario.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-medium">Factor validez</label>
                                        <input
                                            {...register("factorValides", { required: 'Ingrese el factor de validez', valueAsNumber: true })}
                                            type="number"
                                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-300"
                                        />
                                        {errors.factorValides && <p className="text-red-500 text-xs">{errors.factorValides.message}</p>}
                                    </div>
                                    <div className="col-span-1">
                                        <label htmlFor="categoriaGasto" className="block text-gray-700 font-medium">Categoría de gasto</label>
                                        <select
                                            id="categoriaGasto"
                                            {...register("categoriaGasto", { required: 'Seleccione una categoria' })}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Seleccione la categoría de gasto</option>
                                            {categoriaGastos.map((item) => (
                                                <option key={item._id} value={item._id}>
                                                    {item.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.categoriaGasto && <p className="text-red-500 text-xs">{errors.categoriaGasto.message}</p>}
                                    </div>
                                </div>
                                <button className="mt-2  bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {loading && <Loader />}
        </div>

    );
};
