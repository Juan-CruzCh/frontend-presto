import { useParams } from "react-router"
import { EditarRol } from "../components/EditarRol"

export const EditarRolPage = () => {
    const { id } = useParams()
    return (
        <>{id && <EditarRol id={id} />}</>
    )
}
