import { ReactNode, useEffect, useState } from 'react'
import { AutenticacionContext } from './AutenticacionContext'
import { useCookies } from 'react-cookie';


export const AutenticacionProvider = ({ children }: { children: ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [isAutenticacion, SetIsAutenticacion] = useState<boolean>(!!cookies)


    const setToken = (token: string) => {
        if (token) {
            setCookie('token', token, {
            })
            SetIsAutenticacion(true)
        }
    }
    useEffect(() => {
        if (cookies.token) {
            SetIsAutenticacion(true)
        } else {
            SetIsAutenticacion(false)

        }

    }, [cookies])

    const cerrarSession = () => {
        removeCookie('token')
        SetIsAutenticacion(false)
    }
    return (
        <AutenticacionContext.Provider value={{ cerrarSession, setToken, isAutenticacion: isAutenticacion, token: cookies.token }} >
            {children}
        </AutenticacionContext.Provider>
    )
}
