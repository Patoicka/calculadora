import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    number: 0,
    nombre: ''
};

export const calculator = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setNumber: (state, action) => {
            state.number = action.payload;
        },
        setNombre: (state, action) => {
            state.nombre = action.payload;
        },
    },
});

export const { setNumber, setNombre } = calculator.actions;

export default calculator.reducer;
