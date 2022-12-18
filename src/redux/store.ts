import { configureStore } from '@reduxjs/toolkit';
import productsSlice from "./ProductsSlice";
import PopupSlice from './PopupSlice';
import SearchSlice from "./SearchSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        popup: PopupSlice,
        search: SearchSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;






