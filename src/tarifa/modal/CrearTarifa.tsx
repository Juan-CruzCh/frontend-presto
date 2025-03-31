import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormTarifaI } from '../interface/formTarifa';
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from 'react-icons/md';
import { DataI } from '../interface/data';
import { crearTarifa } from '../service/tarifasService';
import { HttpStatus } from '../../core/enums/httpStatus';
import toast from 'react-hot-toast';
import { AxiosError, HttpStatusCode } from 'axios';
import { ErrorI } from '../../core/interface/error';
import { Loader } from '../../core/components/Loader';


export const CrearTarifa = ({ recargar, setRecargar }: { recargar: boolean, setRecargar: (recargar: boolean) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [conflicto, setConflicto] = useState<string>()
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormTarifaI>()
    const [loading, setLoading] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [tarifas, setTarifas] = useState<FormTarifaI[]>([])
    const [nombre, setNombre] = useState<string>('')
    const [disableNombre, setDisableNombre] = useState(false)
    const onsubmit = (data: FormTarifaI) => {
        data.uuid = uuidv4()
        setNombre(data.nombre)
        setTarifas((prev) => [...prev, data])
        setDisableNombre(true)

    }


    const guardar = async () => {
        const data: DataI = {
            nombre: nombre,
            rangos: tarifas.map((item) => {
                return { rango1: Number(item.rango1), rango2: Number(item.rango2), costo: Number(item.costo), iva: item.iva }
            })
        }
        try {
            setLoading(true)
            const response = await crearTarifa(data)
            if (response.status == HttpStatus.CREATED) {
                setLoading(false)
                toast.success('Tarifa registrada')
                setTarifas([])
                setDisableNombre(false)
                setRecargar(!recargar)
                setConflicto('')
                reset()
            }

        } catch (error) {
            setLoading(false)
            const e = error as AxiosError
            if (e.response?.status == HttpStatusCode.Conflict) {
                const Conflict = e.response.data as ErrorI
                setConflicto(Conflict.message)
            }

        }



    }

    return (
        <div className="p-4">

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={openModal}
            >
                Registrar Tarifa
            </button>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>


                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-150">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Título del Modal</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-800 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mt-4">
                            <form onSubmit={handleSubmit(onsubmit)} >
                                <div className="grid grid-cols-2 gap-4">

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
                                            disabled={disableNombre}
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Ingresa tu nombre"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                        {errors.nombre && <p className='text-xs text-red-500'>{errors.nombre.message}</p>}
                                        {conflicto && <p className='text-xs text-red-500'>{conflicto}</p>}
                                    </div>


                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="rango1" className="block text-gray-700 font-bold mb-2">
                                            Rango 1
                                        </label>
                                        <input
                                            {...register("rango1", {
                                                valueAsNumber: true, validate: (valuen: number) => {

                                                    if (!valuen && valuen < 0) {
                                                        return "Ingre el rango 1"
                                                    }
                                                    return true
                                                }
                                            })}
                                            type="number"
                                            id="rango1"
                                            name="rango1"
                                            placeholder="Ingresa rango 1"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                        {errors.rango1 && <p className='text-xs text-red-500'>{errors.rango1.message}</p>}
                                    </div>


                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="rango2" className="block text-gray-700 font-bold mb-2">
                                            Rango 2
                                        </label>
                                        <input
                                            {...register("rango2", {
                                                valueAsNumber: true, validate: (value: number) => {
                                                    if (!value) {
                                                        return "Ingre el rango 2"
                                                    }
                                                    if (value < watch("rango1")) {
                                                        return 'El rango 2 debe ser mayor que rango 1'
                                                    }
                                                    return true
                                                }
                                            })}
                                            type="number"
                                            id="rango2"
                                            name="rango2"
                                            placeholder="Ingresa rango 2"
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                        {errors.rango2 && <p className='text-xs text-red-500'>{errors.rango2.message}</p>}
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">

                                        <label htmlFor="precio" className="block text-gray-700 font-bold mb-2">
                                            costo
                                        </label>
                                        <input
                                            {...register("costo", {
                                                valueAsNumber: true,
                                                validate: (value: number) => {
                                                    if (!value) {
                                                        return "Ingre el costo"
                                                    }

                                                    return true
                                                }

                                            })}
                                            type="number"
                                            id="costo"
                                            name="costo"
                                            step="any"
                                            placeholder="Ingresa el costo"
                                            defaultValue={0}
                                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                        {errors.costo && <p className='text-xs text-red-500'>{errors.costo.message}</p>}
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
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Registar
                                    </button>
                                </div>
                            </form>

                        </div>



                        {tarifas.length > 0 && <>
                            <table className="min-w-full">
                                <thead className="bg-gray-200 text-gray-700 uppercase">
                                    <tr className='text-sm'>
                                        <th className="py-3 px-4 border-b text-left">Nombre</th>
                                        <th className="py-3 px-4 border-b text-left">Rango 1</th>
                                        <th className="py-3 px-4 border-b text-left">Rango 2</th>
                                        <th className="py-3 px-4 border-b text-left">Precio</th>
                                        <th className="py-3 px-4 border-b text-left">Iva</th>
                                        <th className="py-3 px-4 border-b text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tarifas.map((item, index) => (
                                        <tr key={index} className="text-sm border-b hover:bg-gray-100 transition duration-200">
                                            <td className="py-3 px-4">{item.nombre}</td>
                                            <td className="py-3 px-4">{item.rango1}</td>
                                            <td className="py-3 px-4">{item.rango2}</td>
                                            <td className="py-3 px-4">{item.costo}</td>
                                            <td className="py-3 px-4">{item.iva}</td>
                                            <td className="py-3 px-4 text-center">
                                                <button onClick={() => {
                                                    const tarifa = tarifas.filter((i) => i.uuid !== item.uuid)
                                                    setTarifas(tarifa)
                                                    if (tarifas.length <= 1) {
                                                        setDisableNombre(false)
                                                    }

                                                }} className=" text-red-600 text-2xl">
                                                    <MdDelete />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4">
                                <button
                                    onClick={guardar}
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        </>}
                    </div>





                </div>


            )}

            {loading && <Loader />}
        </div>
    );
};
