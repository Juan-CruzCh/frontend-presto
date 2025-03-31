export const ItemsPagina = ({ limite }: { limite: (limite: number) => void }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        limite(Number(event.target.value));
    };

    return (
        <div className="mb-4">
            <label htmlFor="itemsPerPage" className="block text-xs font-medium text-gray-700 mb-2">
                Items por página
            </label>
            <select
                name="itemsPerPage"
                id="itemsPerPage"
                onChange={handleChange}
                className="block px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
            >

                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
                <option value="400">400</option>
                <option value="600">600</option>
            </select>
        </div>
    );
};