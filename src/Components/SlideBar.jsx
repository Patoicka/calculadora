import { faArrowLeft, faCalculator, faClockRotateLeft, faStickyNote, faSubscript } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setNombre, setOption } from '../store/calculatorSlice'

export const SlideBar = ({ slide }) => {

    const dispatch = useDispatch();

    const goCalculator = () => {
        dispatch(setOption(''));
    };

    const goHistory = () => {
        dispatch(setOption('history'));
    };

    const goNotes = () => {
        dispatch(setOption('notes'));
    };

    const goEquations = () => {
        dispatch(setOption('equations'));
    };

    const goBack = () => {
        dispatch(setOption(''));
        dispatch(setNombre(''));
    };

    return (
        <div
            className={`absolute bg-neutral-800 text-white top-0 right-0 w-80 h-full py-10 px-2 
                           ${slide
                    ? 'animate__animated animate__bounceInRight'
                    : 'animate__animated animate__bounceOutRight'
                }`}
        >
            <div className='flex flex-col h-full justify-between text-sm font-semibold top-0 absolute py-7 px-2'>
                <div>
                    <h1
                        className='flex items-center cursor-pointer mb-10 text-xl'
                        onClick={goCalculator}
                    >
                        <FontAwesomeIcon className='pr-3' icon={faCalculator} /> Calculadora
                    </h1>
                    <h1
                        className='flex items-center cursor-pointer my-10 text-xl'
                        onClick={goHistory}
                    >
                        <FontAwesomeIcon className='pr-3' icon={faClockRotateLeft} /> Historial
                    </h1>
                    <h1
                        className='flex items-center cursor-pointer my-10 text-xl'
                        onClick={goNotes}
                    > <FontAwesomeIcon className='pr-3' icon={faStickyNote} /> Notas
                    </h1>
                    <h1
                        className='flex items-center cursor-pointer my-10 text-xl'
                        onClick={goEquations}
                    > <FontAwesomeIcon className='pr-3' icon={faSubscript} /> Fórmulas
                    </h1>
                </div>
                <h1
                    className='flex items-center cursor-pointer text-xl'
                    onClick={goBack}
                > <FontAwesomeIcon className='pr-3' icon={faArrowLeft} /> Reiniciar
                </h1>
            </div>
        </div>
    )
}
