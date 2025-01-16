import React, { useEffect, useState } from 'react';
import { ButtonNumber } from '../Components/ButtonNumber';
import { ButtonOperations } from '../Components/ButtonOperations';
import { ButtonAction } from '../Components/ButtonAction';
import { useDispatch } from 'react-redux';
import { setNombre } from '../store/calculatorSlice';

export const Calculadora = ({ nombre }) => {

    const dispatch = useDispatch();

    const [currentValue, setCurrentValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [previousValue, setPreviousValue] = useState(null);

    useEffect(() => {
        if (currentValue.length > 9) {
            setCurrentValue(currentValue.substring(0, 9));
        };
    }, [operator]);


    const handleNumberClick = (num) => {
        if (currentValue === '0') {
            setCurrentValue(String(num));
        } else {
            setCurrentValue(currentValue + String(num));
        }
    };

    const handleOperationClick = (op) => {
        setPreviousValue(currentValue);
        setOperator(op);
        setCurrentValue('0');
    };

    const calculate = () => {
        if (!operator || previousValue === null) return;

        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        let result;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '÷':
                result = current === 0 ? 'Error' : prev / current;
                break;
            default:
                return;
        }

        setCurrentValue(String(result));
        setPreviousValue(null);
        setOperator(null);
    };

    const handleClear = () => {
        setCurrentValue('0');
        setPreviousValue(null);
        setOperator(null);
    };

    const handleToggleSign = () => {
        setCurrentValue(String(parseFloat(currentValue) * -1));
    };

    const handlePercentage = () => {
        setCurrentValue(String(parseFloat(currentValue) / 100));
    };

    const goBack = () => {
        dispatch(setNombre(''));
    };

    return (
        <div className="h-screen w-[40%] relative mx-auto overflow-x-hidden bg-black px-2 flex flex-col justify-end pb-2">
            <div className='absolute flex flex-col top-2'>
                <button
                    onClick={goBack}
                    className='flex w-10 items-center justify-start text-xl text-white font-semibold'
                >
                    ← <span className='text-sm px-1 pt-1'> Regresar </span>
                </button>
                <span className='text-sm text-white'> <span className='text-lg font-bold'> Bienvenido </span> {nombre} </span>
            </div>
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
