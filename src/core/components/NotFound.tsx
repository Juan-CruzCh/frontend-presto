export const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center text-gray-800 px-8 py-16 bg-white rounded-lg shadow-xl max-w-lg w-full">
                <h1 className="text-9xl font-extrabold mb-4 text-indigo-600">
                    404
                </h1>
                <p className="text-3xl font-semibold mb-4 text-gray-700">
                    ¡Vaya! Página no encontrada.
                </p>
                <p className="text-lg mb-6 text-gray-500">
                    Parece que la página que buscas no existe o fue movida.
                </p>
                <a
                    href="/"
                    className="inline-block px-10 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-md transform transition duration-300 hover:scale-110 hover:bg-indigo-700"
                >
                    Volver al inicio
                </a>
            </div>
        </div>
    );
};
