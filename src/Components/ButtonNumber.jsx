import React from 'react'

export const ButtonNumber = ({ number, className, onClick }) => {
    return (
        <button onClick={onClick} className={`flex bg-neutral-700 ${className} p-4 text-3xl font-semibold text-gray-200 justify-center items-center rounded-full`}>
            {number}
        </button>
    )
}
