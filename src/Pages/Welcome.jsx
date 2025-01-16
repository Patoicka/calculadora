import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNombre } from '../store/calculatorSlice';

export const Welcome = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [errorMsj, setErrorMsj] = useState('');

    const handleAddName = () => {
        if (name.trim()) {
            dispatch(setNombre(name));
        } else {
            setErrorMsj('Falta añadir nombre');
        };
    };

    return (
        <div className="h-screen w-[40%] mx-auto text-white bg-black px-2 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">CALCULADORA</h1>
            <p className="text-sm mt-6">Por favor agrega tu nombre...</p>
            <input
                type="text"
                name="nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-1 px-2 rounded-lg border-2 bg-transparent text-center text-sm"
                placeholder="Escribe tu nombre"
            />

            {errorMsj && <span className='text-sm text-red-500 font-bold mt-2'> {errorMsj} </span>}

            <button
                className="text-sm bg-green-600 border-2 rounded-lg p-2 px-4 font-semibold mt-4 hover:border-white hover:text-white hover:bg-black"
                onClick={handleAddName}
            >
                Añadir
            </button>
        </div>
    );
};
