import { useEffect, useState } from "react";
import { DataRol } from "../interface/dataRo";
import { crearRol } from "../service/rolService";
import { PermissionsState } from "../interface/rol";
import { availablePermissions } from "../util/permisos";

import toast from 'react-hot-toast';
import { HttpStatus } from "../../core/enums/httpStatus";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { ErrorI } from "../../core/interface/error";
import { Loader } from "../../core/components/Loader";


export const CrearRol = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [roleName, setRoleName] = useState("");
    const [error, setError] = useState<string>()
    const [permissions, setPermissions] = useState<PermissionsState>({});

    useEffect((() => setError('')), [roleName])
    // Cambiar el estado de los permisos
    const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [name]: checked,
        }));
    };

    // Enviar los datos del rol y permisos seleccionados
    const handleSubmit = async () => {
        const selectedPermissions = Object.keys(permissions).filter(
            (permissionId) => permissions[permissionId]
        );
        const dataRol: DataRol = {
            nombre: roleName,
            permisos: selectedPermissions
        }

        try {

            setLoading(true)
            const response = await crearRol(dataRol)
            if (response.status == HttpStatus.CREATED) {
                setLoading(false)
                toast.success('Rol registrado')
                navigate('/listar/rol')
            }

        } catch (error) {
            setLoading(false)
            const e = error as AxiosError
            if (e.response?.status == HttpStatus.CONFLICT) {
                const mensaje = e.response.data as ErrorI
                console.log(mensaje.message);

                setError(mensaje.message)

            }

            console.log(error);

        }

    };

    return (
        <div className="rounded-lg shadow-lg p-6  ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Asignar Rol</h2>
            </div>
            <div className="mt-4">
                <form>
                    <div className="grid grid-cols-1 gap-6">
                        {/* Primera fila: Nombre del Rol */}
                        <div className="mb-4">
                            <label
                                htmlFor="roleName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nombre del Rol
                            </label>
                            <input
                                id="roleName"
                                type="text"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md"
                                placeholder="Ingrese el nombre del rol"
                            />
                            {error && <p className="text-red-600 text-xs">{error}</p>}
                        </div>

                        {/* Segunda fila: Permisos por Módulo */}
                        <div className="mb-4">
                            <p className="font-semibold text-sm mb-2">Permisos por Módulo</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {Object.keys(availablePermissions).map((module) => (
                                    <div key={module} className="mb-4">
                                        <p className="text-lg font-semibold text-gray-800 mb-2">
                                            {module.charAt(0).toUpperCase() + module.slice(1)}
                                        </p>
                                        <div className="flex flex-col space-y-2">
                                            {availablePermissions[module].map((permission) => (
                                                <label key={permission.id} className="flex items-center text-sm">
                                                    <input
                                                        type="checkbox"
                                                        name={permission.id}
                                                        checked={permissions[permission.id] || false}
                                                        onChange={handlePermissionChange}
                                                        className="mr-2"
                                                    />
                                                    {permission.label}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Guardar
                </button>
            </div>
            {loading && <Loader />}
        </div>


    );
};
