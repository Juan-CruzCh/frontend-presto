import { useForm } from "react-hook-form";
import { BuscadorLecturaI } from "../interface/buscadorLectura";
import { useEffect } from "react";


export const BuscadorLectura = ({ onSubmit }: { onSubmit: (data: BuscadorLecturaI) => void }) => {
    const { register, handleSubmit, setValue } = useForm<BuscadorLecturaI>();
    useEffect(() => {
        const date = new Date()
        const fecha = date.toISOString().split('T')[0]
        setValue("fechaFin", fecha)
        setValue("fechaInicio", fecha)

    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Campo: Número de Medidor */}
                <div>
                    <label htmlFor="numeroMedidor" className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">Número de Medidor</label>
                    <input
                        {...register("numeroMedidor")}
                        id="numeroMedidor"
                        className="w-full p-1 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Campo: Estado */}
                <div>
                    <label htmlFor="estado" className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">Estado</label>
                    <select
                        {...register("estado")}
                        id="estado"
                        className="w-full p-1 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Seleccione el estado</option>
                        <option value='PENDIENTE'>Pendiente</option>
                        <option value='PAGADO'>Pagado</option>
                    </select>
                </div>

                {/* Campo: Fecha de Inicio */}
                <div>
                    <label htmlFor="fechaInicio" className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">Fecha de Inicio</label>
                    <input
                        type="date"
                        {...register("fechaInicio")}
                        id="fechaInicio"
                        className="w-full p-1 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Campo: Fecha de Fin */}
                <div>
                    <label htmlFor="fechaFin" className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">Fecha de Fin</label>
                    <input
                        type="date"
                        {...register("fechaFin")}
                        id="fechaFin"
                        className="w-full p-1 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Botón de búsqueda */}
                <div>
                    <button type="submit" className="mt-4 sm:mt-6 bg-blue-500 text-white p-1 sm:p-4 text-xs sm:text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Buscar
                    </button>
                </div>
            </div>
        </form>

    );
};
