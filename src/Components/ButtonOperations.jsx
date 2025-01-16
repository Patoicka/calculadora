import React from 'react'

export const ButtonOperations = ({ value, onClick }) => {
    return (
        <button onClick={onClick} className='flex bg-yellow-600 p-4  text-3xl font-semibold text-gray-200 justify-center items-center rounded-full'>
            {value}
        </button>
    )
}
