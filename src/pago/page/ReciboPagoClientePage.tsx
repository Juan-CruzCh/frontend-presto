import { useParams } from "react-router"
import { ReciboPagoCliente } from "../components/ReciboPagoCliente"

export const ReciboPagoClientePage = () => {
    const { medidor } = useParams()
    return (
        <>  {medidor && <ReciboPagoCliente medidor={medidor} />}</>
    )
}
