import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    numbers: [],
    nombre: '',
    option: '',
    slide: false,
    notes: [],
};

export const calculator = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setNumbers: (state, action) => {
            state.numbers = [...state.numbers, action.payload];
        },
        setNombre: (state, action) => {
            state.nombre = action.payload;
        },
        setOption: (state, action) => {
            state.option = action.payload;
        },
        setSlide: (state, action) => {
            state.slide = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = [...state.notes, action.payload];
        },
        setDeleteNotes: (state) => {
            state.notes = [];
        }
    },
});

export const { setNumbers, setNombre, setOption, setSlide, setNotes, setDeleteNotes } = calculator.actions;

export default calculator.reducer;
