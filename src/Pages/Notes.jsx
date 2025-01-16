import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteNotes, setNotes, setSlide } from '../store/calculatorSlice';
import { SlideBar } from '../Components/SlideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSave, faStickyNote } from '@fortawesome/free-solid-svg-icons';

export const Notes = () => {

    const { slide, notes } = useSelector((state => state.calculator));
    const dispatch = useDispatch();

    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [newNote, setNewNote] = useState(false);
    const [note, setNote] = useState('');
    const [loader, setLoader] = useState(false);

    console.log(note);

    const toggleSlide = () => {
        if (isAnimatingOut) {
            dispatch(setSlide(true));
        } else {
            setTimeout(() => {
                dispatch(setSlide(false));
            }, 500);
        };
    };

    const saveNote = () => {
        setNewNote(false);
        setLoader(true);
        dispatch(setNotes(note));

        setTimeout(() => {
            setNote('');
            setLoader(false);
        }, 1500);
    };

    const deleteNotes = () => {
        setNewNote(false);
        setLoader(true);
        setNote('');
        dispatch(setDeleteNotes());

        setTimeout(() => {
            setLoader(false);
        }, 1500);
    };

    useEffect(() => {
        toggleSlide();
    }, [isAnimatingOut])


    return (
        <div className='h-screen w-[40%] border-l border-r relative overflow-x-hidden mx-auto bg-black px-3 flex flex-col py-2'>
            <h1 className='text-2xl uppercase text-white text-center font-bold mt-8'> Notas </h1>
            <FontAwesomeIcon className='absolute top-4 right-4 text-lg cursor-pointer text-white' icon={faBars} onClick={() => { setIsAnimatingOut(!isAnimatingOut) }} />
            {slide && <SlideBar slide={isAnimatingOut} />}
            {loader ?
                <div class="flex items-center justify-center h-screen bg-opacity-0 bg-gray-900">
                    <div class="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin-reverse"></div>
                </div>
                :
                <>

                    <div className='flex justify-center w-full'>

                        <button
                            className='text-white bg-yellow-700 justify-center w-32 my-4 mx-4 rounded-lg p-1 border-2'
                            onClick={() => setNewNote(!newNote)}
                        >
                            <FontAwesomeIcon icon={faStickyNote} /> Nueva nota
                        </button>
                    </div>

                    {newNote &&
                        <div className='flex flex-col w-full items-center'>
                            <textarea
                                className='w-full p-2 rounded bg-neutral-800 text-white border-2'
                                style={{ maxHeight: "10rem" }}
                                onChange={(e) => (setNote(e.target.value))}
                            />

                            <button
                                disabled={note === ''}
                                className='bg-yellow-700 w-22 p-2 mt-3 rounded text-white border-2'
                                onClick={saveNote}
                            >
                                <FontAwesomeIcon icon={faSave} /> Agregar
                            </button>
                        </div>
                    }

                    <div className='flex h-full w-full overflow-y-auto'>
                        <table className='table-auto mt-5'>
                            <tbody className='overflow-y-auto'>
                                {notes.map((note, index) => {
                                    return (
                                        <div className='mb-5'>
                                            <h1 className='text-white text-xl font-bold'> Nota {index + 1} </h1>
                                            <p className='text-white' > {note} </p>
                                        </div>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <button
                        onClick={deleteNotes}
                        className='bg-yellow-700 w-22 p-2 mt-3 mx-12 rounded text-white border-2'
                    >
                        Borrar notas
                    </button>

                </>
            }

        </div >
    )
}
