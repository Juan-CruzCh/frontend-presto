import { ReactNode, useContext, useEffect, useState } from 'react'
import { listarRolUser } from '../../rol/service/rolService'
import { PermisosContext } from './PermisosContext'
import { PermisosI } from '../interface/permisos';
import { AutenticacionContext } from './AutenticacionContext';

export const PermisosProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useContext(AutenticacionContext)
    const [permisos, setPermisos] = useState<PermisosI>({
        permisosGasto: [],
        permisosLectura: [],
        permisosPago: [],
        permisosUsuario: [],
        permisosTarifa: [],
        permisosRol: [],
        permisosMedidor: [],
        permisosCliente: []
    });
    useEffect(() => {
        roles()
    }, [token])
    const roles = async () => {
        try {
            const response = await listarRolUser()
            const permisosLectura: string[] = response.permisos.filter((item) => item.includes('LECTURA'))
            const permisosGasto: string[] = response.permisos.filter((item) => item.includes('GASTO'))
            const permisosPago: string[] = response.permisos.filter((item) => item.includes('PAGO'))
            const permisosMedidor: string[] = response.permisos.filter((item) => item.includes('MEDIDOR'))
            const permisosRol: string[] = response.permisos.filter((item) => item.includes('ROL'))
            const permisosUsuario: string[] = response.permisos.filter((item) => item.includes('USUARIO'))
            const permisosTarifa: string[] = response.permisos.filter((item) => item.includes('TARIFA'))
            const permisosCliente: string[] = response.permisos.filter((item) => item.includes('CLIENTE'))

            setPermisos({ permisosGasto, permisosLectura, permisosPago, permisosRol, permisosUsuario, permisosTarifa, permisosMedidor, permisosCliente })
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <PermisosContext.Provider value={permisos}>
            {children}
        </PermisosContext.Provider>
    )
}
