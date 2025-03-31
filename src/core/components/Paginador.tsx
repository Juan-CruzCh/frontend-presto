export const Paginador = ({
    paginas,
    paginaSeleccionada,
    paginaActual,
}: {
    paginas: number;
    paginaSeleccionada: (pagina: number) => void;
    paginaActual: number;
}) => {

    const botones = [];
    const rangoVisibilidad = 3;
    const inicio = Math.max(paginaActual - rangoVisibilidad, 1);
    const fin = Math.min(paginaActual + rangoVisibilidad, paginas);

    botones.push(
        <button
            key="prev"
            onClick={() => paginaSeleccionada(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
        >
            Prev
        </button>
    );
    if (inicio > 1) {
        botones.push(
            <button
                key={1}
                onClick={() => paginaSeleccionada(1)}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
            >
                1
            </button>
        );
        if (inicio > 2) {
            botones.push(
                <span key="dots-left" className="px-3 py-1 text-gray-700">
                    ...
                </span>
            );
        }
    }

    for (let i = inicio; i <= fin; i++) {
        botones.push(
            <button
                key={i}
                onClick={() => paginaSeleccionada(i)}
                className={`px-3 py-1 border border-gray-300 rounded-md text-gray-700 ${i === paginaActual ? 'bg-gray-300' : 'hover:bg-gray-200'
                    }`}
            >
                {i}
            </button>
        );
    }

    if (fin < paginas) {
        if (fin < paginas - 1) {
            botones.push(
                <span key="dots-right" className="px-3 py-1 text-gray-700">
                    ...
                </span>
            );
        }
        botones.push(
            <button
                key={paginas}
                onClick={() => paginaSeleccionada(paginas)}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
            >
                {paginas}
            </button>
        );
    }
    botones.push(
        <button
            key="next"
            onClick={() => paginaSeleccionada(paginaActual + 1)}
            disabled={paginaActual === paginas}
            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
        >
            Next
        </button>
    );

    return <div className="mt-4 flex justify-center space-x-2">{botones}</div>;
};