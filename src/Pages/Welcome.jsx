import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNombre, setSlide } from '../store/calculatorSlice';

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

    useEffect(() => {
        dispatch(setSlide(false));
    }, []);

    return (
        <div className="h-screen w-screen mx-auto text-white bg-black px-2">
            <form className='flex flex-col h-full justify-center items-center' onSubmit={handleAddName}>
                <h1 className="text-6xl font-bold">CALCULADORA</h1>
                <p className="text-xl mt-6">Por favor agrega tu nombre...</p>
                <input
                    type="text"
                    name="nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-6 p-4 rounded-lg border-2 bg-transparent text-center text-lg"
                    placeholder="Escribe tu nombre"
                />

                {errorMsj && <span className='text-red-500 font-bold mt-2'> {errorMsj} </span>}

                <button
                    type='submit'
                    className="text-lg uppercase bg-green-600 border-2 rounded-lg p-4 font-semibold mt-6 hover:border-white hover:text-white hover:bg-black"
                >
                    Añadir
                </button>
            </form>
        </div >
    );
};
