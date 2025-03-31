import { FaFileExcel } from "react-icons/fa"

import { MouseEventHandler } from 'react';

export const ButtonDescargarExcel = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
    return (
        <div className="flex justify-end gap-4">
            <button onClick={onClick} className="text-2xl text-green-600">
                <FaFileExcel />
            </button>
        </div>
    )
}