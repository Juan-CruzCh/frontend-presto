import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormCategoriaGastoI } from "../interface/formCategoriaGasto";
import { crearCategoriaGasto } from "../service/categoriaGastoService";
import { HttpStatus } from "../../core/enums/httpStatus";

export const CrearCategoriaModal = ({ recargar, setRecargar }: { recargar: boolean, setRecargar: (recargar: boolean) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const { handleSubmit, register, formState: { errors }, reset } = useForm<FormCategoriaGastoI>()
    const onSubmit = async (data: FormCategoriaGastoI) => {
        try {
            const response = await crearCategoriaGasto(data)
            if (response.status == HttpStatus.CREATED) {
                reset()
                setRecargar(!recargar)
                closeModal()

            }
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div className="p-4">

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={openModal}
            >
                Registar categoria
            </button>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>


                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Registar Categoria gasto</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg  space-y-4">
                                <label htmlFor="categoria" className="block text-gray-700 font-medium">Nombre de categoría</label>
                                <input {...register("nombre", { required: 'Ingrese el nombre' })} type="text" id="categoria" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ingrese categoría" />
                                {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Guardar</button>

                            </form>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};
