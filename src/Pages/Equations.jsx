import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { setSlide } from '../store/calculatorSlice'
import { SlideBar } from '../Components/SlideBar'

export const Equations = () => {
    const { slide } = useSelector((state) => state.calculator);
    const dispatch = useDispatch();

    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [form1, setForm1] = useState(true);
    const [varA, setVarA] = useState('');
    const [varB, setVarB] = useState('');
    const [varC, setVarC] = useState('');
    const [result, setResult] = useState('');

    console.log(varA, varB, varC);

    const toggleSlide = () => {
        if (isAnimatingOut) {
            dispatch(setSlide(true));
        } else {
            setTimeout(() => {
                dispatch(setSlide(false));
            }, 500);
        }
    };

    const goChicharron = () => {
        setForm1(!form1);
    };

    const calculateFormula = () => {
        const a = parseFloat(varA);
        const b = parseFloat(varB);
        const c = parseFloat(varC);

        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            setResult('Por favor, ingresa valores numéricos válidos.');
            return;
        }

        if (a === 0) {
            setResult('El coeficiente "a" no puede ser 0 en una ecuación cuadrática.');
            return;
        }

        const discriminant = b ** 2 - 4 * a * c;

        if (discriminant < 0) {
            setResult('La ecuación no tiene soluciones reales.');
        } else {
            const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

            setResult(`Las soluciones son: x₁ = ${root1.toFixed(2)}, x₂ = ${root2.toFixed(2)}`);
        };
    };

    const restart = () => {
        setVarA('');
        setVarB('');
        setVarC('');
        setResult('');
    };

    useEffect(() => {
        toggleSlide();
    }, [isAnimatingOut]);

    return (
        <div className="h-screen w-full relative overflow-x-hidden mx-auto bg-black px-3 flex flex-col py-2">
            <h1 className="text-6xl uppercase text-white text-center font-bold mt-8">Fórmulas</h1>
            <FontAwesomeIcon
                className="absolute top-10 right-10 text-4xl cursor-pointer text-white"
                icon={faBars}
                onClick={() => {
                    setIsAnimatingOut(!isAnimatingOut);
                }}
            />
            {slide && <SlideBar slide={isAnimatingOut} />}

            <div className="flex flex-col items-center text-white w-full mt-5">
                <span className="text-xl italic">Selecciona una opción.</span>

                <div className="flex">
                    <button
                        className="text-white text-xl bg-yellow-700 justify-center w-48 my-8 mx-4 rounded-lg p-3 border-2"
                        onClick={goChicharron}
                    >
                        Fórmula general
                    </button>
                </div>
            </div>

            {form1 && (
                <div className="flex flex-col w-full items-center text-white mt-10">
                    <h1 className="text-xl font-semibold">Agrega los datos</h1>

                    <div className="mt-4 text-xl">
                        <input
                            type="text"
                            value={varA}
                            onChange={(e) => setVarA(e.target.value)}
                            className="w-10 text-black text-center rounded-lg p-1 mx-1"
                        />{' '}
                        x² +
                        <input
                            type="text"
                            value={varB}
                            onChange={(e) => setVarB(e.target.value)}
                            className="w-10 text-black text-center rounded-lg p-1 mx-1"
                        />{' '}
                        x +
                        <input
                            type="text"
                            value={varC}
                            onChange={(e) => setVarC(e.target.value)}
                            className="w-10 text-black text-center rounded-lg p-1 mx-1"
                        />{' '}
                        = 0
                    </div>

                    <button
                        className="text-white font-semibold text-xl bg-yellow-700 justify-center w-48 my-8 mx-4 rounded-lg p-2 border-2"
                        onClick={calculateFormula}
                        disabled={(varA || varB || varC) === '' ? true : false}
                    >
                        Calcular
                    </button>

                    {result && (
                        <div className="flex flex-col items-center mt-4 text-white text-lg">
                            <strong>Resultado:</strong> {result}
                            <button
                                className="text-white font-semibold text-lg bg-red-700 justify-center w-32 my-8 mx-4 rounded-lg p-1 border-2"
                                onClick={restart}
                            >
                                Reiniciar
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
