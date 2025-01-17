import React, { useEffect, useState } from 'react';
import { ButtonNumber } from '../Components/ButtonNumber';
import { ButtonOperations } from '../Components/ButtonOperations';
import { ButtonAction } from '../Components/ButtonAction';
import { useDispatch, useSelector } from 'react-redux';
import { setSlide, setNumbers } from '../store/calculatorSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import { SlideBar } from '../Components/SlideBar';

export const Calculadora = ({ nombre }) => {
    const { slide } = useSelector((state) => state.calculator);
    const dispatch = useDispatch();

    const [currentValue, setCurrentValue] = useState('0');
    const [operation, setOperation] = useState('');
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        if (currentValue.length > 9) {
            setCurrentValue(currentValue.substring(0, 9));
        }
    }, [currentValue]);

    const toggleSlide = () => {
        if (isAnimatingOut) {
            dispatch(setSlide(true));
        } else {
            setTimeout(() => {
                dispatch(setSlide(false));
            }, 500);
        }
    };

    useEffect(() => {
        toggleSlide();
    }, [isAnimatingOut]);

    const handleNumberClick = (num) => {
        if (currentValue === '0') {
            setCurrentValue(String(num));
            setOperation(String(num));
        } else {
            setCurrentValue(String(num));
            setOperation(operation + String(num));
        }
    };


    const handleOperationClick = (op) => {
        if (currentValue === 'Error') return;

        setOperation(operation + ` ${op} `);
        setCurrentValue(op);
    };

    const calculate = () => {
        try {
            const sanitizedOperation = operation.replace(/x/g, '*').replace(/÷/g, '/');
            const result = eval(sanitizedOperation);

            dispatch(setNumbers({ operation, result }));

            setCurrentValue(String(result));
            setOperation('');
        } catch (error) {
            console.log(error);
            setCurrentValue('Error');
        }
    };

    const handleClear = () => {
        setCurrentValue('0');
        setOperation('');
    };

    const handleToggleSign = () => {
        setCurrentValue(String(parseFloat(currentValue) * -1));
        setOperation(operation + ` * -1`);
    };

    const handlePercentage = () => {
        setCurrentValue(String(parseFloat(currentValue) / 100));
        setOperation(operation + ` / 100`);
    };

    return (
        <div className="h-screen w-full border-l border-r relative overflow-x-hidden mx-auto bg-black px-10 flex flex-col justify-end py-2">
            <div className="absolute z-20 flex w-full items-center justify-between top-2 right-0 px-10">
                <span className="text-3xl text-white">
                    <span className="text-6xl font-bold"> Bienvenido </span> {nombre}
                </span>
                <FontAwesomeIcon
                    className="text-4xl cursor-pointer text-white"
                    icon={faBars}
                    onClick={() => {
                        setIsAnimatingOut(!isAnimatingOut);
                    }}
                />
            </div>

            {slide && <SlideBar slide={isAnimatingOut} />}

            <div className="text-white text-right text-6xl p-4 mb-2">{currentValue}</div>
            <div className="grid grid-cols-4 gap-4">
                <ButtonAction action="AC" onClick={handleClear} />
                <ButtonAction action="+/-" onClick={handleToggleSign} />
                <ButtonAction action="%" onClick={handlePercentage} />
                <ButtonOperations value="÷" onClick={() => handleOperationClick('÷')} />

                <ButtonNumber number={7} onClick={() => handleNumberClick(7)} />
                <ButtonNumber number={8} onClick={() => handleNumberClick(8)} />
                <ButtonNumber number={9} onClick={() => handleNumberClick(9)} />
                <ButtonOperations value="x" onClick={() => handleOperationClick('x')} />

                <ButtonNumber number={4} onClick={() => handleNumberClick(4)} />
                <ButtonNumber number={5} onClick={() => handleNumberClick(5)} />
                <ButtonNumber number={6} onClick={() => handleNumberClick(6)} />
                <ButtonOperations value="-" onClick={() => handleOperationClick('-')} />

                <ButtonNumber number={1} onClick={() => handleNumberClick(1)} />
                <ButtonNumber number={2} onClick={() => handleNumberClick(2)} />
                <ButtonNumber number={3} onClick={() => handleNumberClick(3)} />
                <ButtonOperations value="+" onClick={() => handleOperationClick('+')} />

                <ButtonNumber
                    className="col-span-2"
                    number={0}
                    onClick={() => handleNumberClick(0)}
                />
                <ButtonNumber number="," />
                <ButtonOperations value="=" onClick={calculate} />
            </div>
        </div>
    );
};
