import React from 'react'

export const ButtonAction = ({ action, onClick }) => {

    return (
        <button onClick={onClick} className='flex bg-neutral-400 p-4 text-3xl font-semibold text-black justify-center items-center rounded-full uppercase'>
            {action}
        </button>
    )
}
