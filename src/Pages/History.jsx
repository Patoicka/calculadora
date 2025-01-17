import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SlideBar } from '../Components/SlideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { setSlide } from '../store/calculatorSlice';

export const History = () => {

    const { numbers, slide } = useSelector((state => state.calculator));
    const dispatch = useDispatch();
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);


    const toggleSlide = () => {
        if (isAnimatingOut) {
            dispatch(setSlide(true));
        } else {
            setTimeout(() => {
                dispatch(setSlide(false));
            }, 500);
        };
    };

    useEffect(() => {
        toggleSlide();
    }, [isAnimatingOut])

    return (
        <div className='h-screen w-full relative overflow-x-hidden mx-auto bg-black px-3 flex flex-col py-2'>

            {slide &&
                <SlideBar slide={isAnimatingOut} />
            }

            <h1 className='text-6xl uppercase text-white text-center font-bold mt-8 mb-6'> Historial </h1>
            <FontAwesomeIcon className='absolute top-10 right-4 text-4xl cursor-pointer text-white' icon={faBars} onClick={() => { setIsAnimatingOut(!isAnimatingOut) }} />

            <table className='table-auto'>
                <tbody className='overflow-y-auto'>
                    {numbers.lengh > 0 ?
                        <>
                            {numbers.map((number, index) => (
                                <tr key={index}>
                                    <td className="pb-3 text-white font-semibold">
                                        <span className='opacity-80 text-sm'> {number.operation} </span>
                                        <p className='text-lg'> {number.result} </p>
                                    </td>
                                </tr>
                            ))}
                        </>
                        :
                        <tr>
                            <td className="text-white text-center text-3xl pt-40">
                                No hay historial para mostrar.
                            </td>
                        </tr>}
                </tbody>
            </table>
        </div >
    )
}
