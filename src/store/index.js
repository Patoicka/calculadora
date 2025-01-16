
import { configureStore } from '@reduxjs/toolkit';
import { calculator } from './calculatorSlice';

const store = configureStore({
    reducer: {
        calculator: calculator.reducer,
    },
});

export default store;
