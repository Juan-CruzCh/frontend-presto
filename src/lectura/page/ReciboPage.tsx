import { useParams } from "react-router"
import { Recibo } from "../components/Recibo"

export const ReciboPage = () => {
    const { medidor, lectura } = useParams()
    return (
        <>
            {medidor && lectura && <Recibo medidor={medidor} lectura={lectura} />}
        </>
    )
}
