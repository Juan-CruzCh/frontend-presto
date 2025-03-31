import { useContext, useEffect, useState } from "react";
import { ClientesModal } from "../../cliente/modal/ClientesModal";
import { RegistarClienteModal } from "../../cliente/modal/RegistrarCliente";
import { listarTarifas } from "../../tarifa/service/tarifasService";
import { TarifaI } from "../../tarifa/interface/tarifa";
import { useForm } from "react-hook-form";
import { FormMedidorI } from "../interface/formMedidor";
import { crearMedidor } from "../service/MedidorService";
import { ClienteI } from "../../cliente/interface/cliente";
import { AxiosError } from "axios";
import { HttpStatus } from "../../core/enums/httpStatus";
import { ErrorConflictoI } from "../../core/interface/errorConflicto";
import { PermisosContext } from "../../autenticacion/context/PermisosContext";
import { PermisosE } from "../../core/enums/permisos";
import { Loader } from "../../core/components/Loader";
import toast from "react-hot-toast";

export const CrearMedidor = () => {
    const [loading, setLoading] = useState(false);
    const [dataTarifa, setDataTarifa] = useState<TarifaI[]>([])
    const [cliente, setCliente] = useState<ClienteI | null>()
    const [mesanje, setMensaje] = useState<string>()
    const [mesanjeConflicto, setMensajeConflicto] = useState<string>()

    const { permisosCliente } = useContext(PermisosContext)
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormMedidorI>()
    const numeroMedidr = watch("numeroMedidor")
    useEffect(() => {
        tarifas()
    }, [])

    useEffect(() => {
        setMensajeConflicto('')
    }, [numeroMedidr])

    const tarifas = async () => {
        try {
            const response = await listarTarifas()
            setDataTarifa(response)
        } catch (error) {

        }
    }
    const onSubmit = async (data: FormMedidorI) => {


        if (cliente) {
            data.cliente = cliente._id

            try {
                setLoading(true)
                const response = await crearMedidor(data)
                if (response.status == HttpStatus.CREATED) {
                    setLoading(false)
                    toast.success('Registrado')
                    setCliente(null)
                    reset()

                }

            } catch (error) {
                setLoading(false)
                const e = error as AxiosError
                if (e.status == HttpStatus.CONFLICT) {
                    const conflicto = e.response?.data as ErrorConflictoI
                    setMensajeConflicto(conflicto.message)
                }

            }
        } else {
            setMensaje("Seleccione un cliente")
        }


    }



    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Registrar Medidor</h2>
            <div className="grid grid-cols-2 gap-4">
                {permisosCliente.some((i) => i.includes(PermisosE.LISTAR_CLIENTE)) && <ClientesModal setCliente={setCliente} />}
                {permisosCliente.some((i) => i.includes(PermisosE.CREAR_CLIENTE)) && <RegistarClienteModal setCliente={setCliente} />}
            </div>

            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>

                {cliente && (
                    <div className="col-span-2 bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Cliente</h2>
                        <div className="text-sm text-gray-600 grid grid-cols-2 gap-4">
                            <p><span className="font-medium text-gray-700">Cod:</span> {cliente.codigo}</p>
                            <p><span className="font-medium text-gray-700">CI:</span> {cliente.ci}</p>
                            <p><span className="font-medium text-gray-700">Nombre:</span> {cliente.nombre}</p>
                            <p><span className="font-medium text-gray-700">Apellido Paterno:</span> {cliente.apellidoPaterno}</p>
                            <p><span className="font-medium text-gray-700">Apellido Materno:</span> {cliente.apellidoMaterno}</p>
                            <p><span className="font-medium text-gray-700">Celular:</span> {cliente.celular}</p>
                        </div>
                    </div>
                )}

                <div>
                    {mesanje && <p className='text-xs text-red-500'>{mesanje}</p>}
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Número de medidor
                    </label>
                    <input
                        {...register("numeroMedidor", { validate: value => value ? true : "Ingrese el N° de medidor" })}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.numeroMedidor && <p className='text-xs text-red-500'>{errors.numeroMedidor.message}</p>}
                    {mesanjeConflicto && <p className='text-xs text-red-500'>{mesanjeConflicto}</p>}
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Fecha de instalación
                    </label>
                    <input
                        {...register("fechaInstalacion", { validate: value => value ? true : "Ingrese la fecha de instalación" })}
                        type="date"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.fechaInstalacion && <p className='text-xs text-red-500'>{errors.fechaInstalacion.message}</p>}
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Observaciones
                    </label>
                    <textarea
                        {...register("descripcion")}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ingrese alguna observación..."
                    />
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Dirección del medidor
                    </label>
                    <input
                        {...register("direccion", { validate: value => value ? true : "Ingrese la dirección" })}
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.direccion && <p className='text-xs text-red-500'>{errors.direccion.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-600 text-sm font-medium mb-1">
                        Seleccione la tarifa
                    </label>
                    <select
                        {...register("tarifa", { validate: value => value ? true : "Seleccione una tarifa" })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Seleccione una tarifa</option>
                        {dataTarifa.map((item) => (
                            <option value={item._id} key={item._id}>{item.nombre}</option>
                        ))}
                    </select>
                    {errors.tarifa && <p className='text-xs text-red-500'>{errors.tarifa.message}</p>}
                </div>


                <button
                    type="submit"
                    className="col-span-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Registrar Medidor
                </button>
            </form>

            {loading && <Loader />}
        </div>
    );
};

