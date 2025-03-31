import { useForm } from "react-hook-form";
import { BuscadorMedidorClientI } from "../interface/buscadorMedidorCliente";

export const BuscadorMedidor = ({ onSubmit }: { onSubmit: (data: BuscadorMedidorClientI) => void }) => {
    const { register, handleSubmit } = useForm<BuscadorMedidorClientI>()
    return (
        <div className="p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-4"
            >
                <div className="flex flex-col w-full">
                    <label htmlFor="ci" className="text-gray-700">CI</label>
                    <input
                        {...register("ci")}
                        type="text"
                        id="ci"
                        className="p-2 border border-gray-300 rounded mt-1"
                        placeholder="Ingrese CI"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="nombre" className="text-gray-700">Nombre</label>
                    <input
                        {...register("nombre")}
                        type="text"
                        id="nombre"
                        className="p-2 border border-gray-300 rounded mt-1"
                        placeholder="Ingrese nombre"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="apellidoPaterno" className="text-gray-700">Apellido Paterno</label>
                    <input
                        {...register("apellidoPaterno")}
                        type="text"
                        id="apellidoPaterno"
                        className="p-2 border border-gray-300 rounded mt-1"
                        placeholder="Ingrese apellido paterno"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="apellidoMaterno" className="text-gray-700">Apellido Materno</label>
                    <input
                        {...register("apellidoMaterno")}
                        type="text"
                        id="apellidoMaterno"
                        className="p-2 border border-gray-300 rounded mt-1"
                        placeholder="Ingrese apellido materno"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label htmlFor="numeroMedidor" className="text-gray-700">N°. de Medidor</label>
                    <input
                        {...register("numeroMedidor")}
                        type="text"
                        id="numeroMedidor"
                        className="p-2 border border-gray-300 rounded mt-1"
                        placeholder="Ingrese número de medidor"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="numeroMedidor" className="block text-gray-700 font-medium mb-2">
                        Estado medidor
                    </label>
                    <select
                        {...register("estado")}
                        id="estado"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                        <option value="">Seleccione el estado</option>
                        <option value="ACTIVO">Activo</option>
                        <option value="INACTIVO">Inactivo</option>
                        <option value="MANTENIMIENTO">Mantenimiento</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 h-10  mt-7 text-white w-30 rounded-2xl"
                >
                    Buscar
                </button>
            </form>
        </div>
    );
};
