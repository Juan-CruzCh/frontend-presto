import { useEffect, useState } from "react";
import { ListarUsuariosI } from "../../usuario/interface/listarUsuarios";
import { perfilUsuario } from "../../usuario/service/usuarioService";
import { HttpStatus } from "../../core/enums/httpStatus";
import { Loader } from "../../core/components/Loader";

export const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState<ListarUsuariosI>()
    useEffect(() => {
        perfil()
    }, [])

    const perfil = async () => {
        try {
            setLoading(true)
            const response = await perfilUsuario()
            if (response.status == HttpStatus.OK) {
                setLoading(false)
                setUsuario(response.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);

        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">¡Bienvenido al Sistema AASPSAS!</h1>
                    <p className="text-xl text-gray-600 mb-4">Gestiona tus servicios de agua con facilidad.</p>
                    <h2 className="text-xl font-semibold text-gray-800 mt-4">Perfil de Usuario</h2>
                    <p className="text-gray-600">Información del usuario registrado</p>
                </div>
                {usuario && <div className="text-gray-700 space-y-4">
                    <p><strong>CI:</strong> {usuario.ci}</p>
                    <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}</p>
                    <p><strong>Usuario:</strong> {usuario.usuario}</p>
                    <p><strong>Dirección:</strong> {usuario.direccion}</p>
                    <p><strong>Celular:</strong> {usuario.celular}</p>
                    <p><strong>Rol:</strong> {usuario.rolNombre}</p>
                </div>}
            </div>
            {loading && <Loader />}
        </div>
    );
};
