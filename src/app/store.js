import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counter'
import userReducer from '../features/apislice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer
    }
})