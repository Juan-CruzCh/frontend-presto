export const BuscadorCliente = ({ setApellidoMaterno, setApellidoPaterno, setCi, setCodigo, setNombre }:
    {
        setCodigo: (codigo: string) => void,
        setCi: (ci: string) => void
        setNombre: (nombre: string) => void,
        setApellidoPaterno: (apellido: string) => void
        setApellidoMaterno: (apellido: string) => void

    }) => {
    return (
        <div className="flex gap-2 p-4">
            <input onChange={
                (e) => {
                    const target = e.target as HTMLInputElement
                    setCodigo(target.value)

                }
            } type="text" placeholder="Código Cliente" className="p-2 border rounded-md w-1/6" />
            <input
                onChange={
                    (e) => {
                        const target = e.target as HTMLInputElement
                        setCi(target.value)

                    }
                }
                type="text" placeholder="Cédula de Identidad" className="p-2 border rounded-md w-1/6" />
            <input
                onChange={
                    (e) => {
                        const target = e.target as HTMLInputElement
                        setNombre(target.value)

                    }
                }
                type="text" placeholder="Nombre" className="p-2 border rounded-md w-1/6" />
            <input
                onChange={
                    (e) => {
                        const target = e.target as HTMLInputElement
                        setApellidoPaterno(target.value)

                    }
                }
                type="text" placeholder="Apellido Paterno" className="p-2 border rounded-md w-1/6" />
            <input
                onChange={
                    (e) => {
                        const target = e.target as HTMLInputElement
                        setApellidoMaterno(target.value)

                    }
                }
                type="text" placeholder="Apellido Materno" className="p-2 border rounded-md w-1/6" />
        </div>
    );
};
