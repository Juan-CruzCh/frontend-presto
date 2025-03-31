import { useForm } from "react-hook-form";
import { AutenticacionI } from "../interface/autenticacion";
import { autenticacion } from "../service/autententicacionService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { useContext, useEffect, useState } from "react";
import { AutenticacionContext } from "../context/AutenticacionContext";
import { AxiosError } from "axios";
import { ErrorI } from '../../core/interface/error'
import { Loader } from "../../core/components/Loader";
import { useNavigate } from "react-router";
export const Autenticacion = () => {
    const navigate = useNavigate()
    const { setToken } = useContext(AutenticacionContext)
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm<AutenticacionI>()
    const [error, setError] = useState<string>()
    const onSubmit = async (data: AutenticacionI) => {
        try {
            setLoading(true)
            const response = await autenticacion(data)
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setToken(response.token)
                navigate('/')
            }
        } catch (error) {
            setLoading(false)
            const e = error as AxiosError
            const er = e.response?.data as ErrorI
            console.log(er);
            if (er.statusCode == HttpStatus.UNAUTHORIZED) {
                setError(er.message)
            }


        }
    }
    useEffect(() => {
        setError('')
    }, [watch("password"), watch("usuario")])
    return (
        <div className="flex justify-center items-center min-h-screen  p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">AASPSAS - PRESTO</h2>
                <p className="text-center text-gray-600 mb-4">Bienvenido, por favor ingrese sus datos</p>


                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            {...register("usuario", { required: 'Ingrese su usuario' })}
                            placeholder="Ingrese su usuario"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        {errors.usuario && <p className="text-red-400 text-xs">{errors.usuario.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: 'Ingrese su contraseña' })}
                            placeholder="Ingrese su contraseña"
                            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
                        {error && <p className="text-red-400 text-xs">{error}</p>}
                    </div>

                    <button type="submit" className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-600 transition">
                        Ingresar
                    </button>
                </form>
            </div>
            {loading && <Loader />}
        </div >

    );
};
