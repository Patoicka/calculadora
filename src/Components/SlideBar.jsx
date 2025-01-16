import { faArrowLeft, faCalculator, faClockRotateLeft, faStickyNote } from '@fortawesome/free-solid-svg-icons'
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

    const goBack = () => {
        dispatch(setOption(''));
        dispatch(setNombre(''));
    };

    return (
        <div
            className={`absolute bg-neutral-800 text-white top-0 right-0 w-28 h-full py-10 px-2 
                           ${slide
                    ? 'animate__animated animate__bounceInRight'
                    : 'animate__animated animate__bounceOutRight'
                }`}
        >
            <div className='flex flex-col h-full justify-between text-sm font-semibold'>
                <div className='mt-3'>
                    <h1
                        className='flex items-center cursor-pointer my-3'
                        onClick={goCalculator}
                    >
                        <FontAwesomeIcon className='pr-1' icon={faCalculator} /> Calculadora
                    </h1>
                    <h1
                        className='flex items-center cursor-pointer my-3'
                        onClick={goHistory}
                    >
                        <FontAwesomeIcon className='pr-1' icon={faClockRotateLeft} /> Historial
                    </h1>
                    <h1
                        className='flex items-center cursor-pointer my-3'
                        onClick={goNotes}
                    > <FontAwesomeIcon className='pr-1' icon={faStickyNote} /> Notas
                    </h1>
                </div>
                <h1
                    className='flex items-center cursor-pointer'
                    onClick={goBack}
                > <FontAwesomeIcon className='pr-1' icon={faArrowLeft} /> Reiniciar
                </h1>
            </div>
        </div>
    )
}
