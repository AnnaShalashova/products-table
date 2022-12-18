import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IProduct {
    id: string,
    status: 'active' | 'archive',
    sum: number,
    qty: number,
    volume: number,    
    name: string,    
    delivery_date: string,   
    currency: string,
    total?: number      
}

interface IProductsState {
    products: Array<IProduct> | null,
    selected: Array<string> | null,
    selectedAll: boolean
}

const initialState: IProductsState = {
    products: [],
    selected: [],
    selectedAll: false
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProducts: (state, action: PayloadAction<Array<IProduct>>) => {
            state.products = action.payload;
        },

        delProducts: (state, action: PayloadAction<any>) => {
            const newProducts = state.products?.filter((p) =>  {
                return !action.payload.includes(p.name)
            });
            state.products =  newProducts ? newProducts : [];
            state.selected = [];
        },

        addOneSelected: (state, action: PayloadAction<string>) => {
            state.selected?.push(action.payload);
            state.selectedAll = false;
        },

        addAllSelected: (state, action: PayloadAction<Array<string>>) => {
            action.payload.forEach((id) => state.selected?.push(id));
            state.selectedAll = true;
            
        },

        delOneSelected: (state, action: PayloadAction<string>) => {
            const newSelectedArr = state.selected?.filter((id) => id !== action.payload);
            if (newSelectedArr ) {
                state.selected = newSelectedArr;
            }
        },

        delAllSelected: (state) => {
           state.selected = [];
           state.selectedAll = false;
        },
    }
});

export const { addProducts, delProducts, addOneSelected, addAllSelected, 
                delOneSelected, delAllSelected } = productsSlice.actions;
export default productsSlice.reducer;