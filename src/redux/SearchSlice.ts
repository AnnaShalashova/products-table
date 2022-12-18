import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ISearchState {
    searchText: string,
    searchColumns: Array<string> | null,
    searchAllColumns: boolean
}

const initialState: ISearchState = {
    searchText: '',
    searchColumns: [],
    searchAllColumns: true
};

const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        },

        setSearchColumn: (state, action: PayloadAction<string>) => {
            state.searchColumns?.push(action.payload);
            state.searchAllColumns = false;
        },

        setAllSearchColumn: (state) => {
            state.searchAllColumns = true;  
            state.searchColumns = []; 
        },

        delSearchColumn: (state, action: PayloadAction<string>) => {
            const res = state.searchColumns?.filter((column) => column !== action.payload);
            state.searchColumns = res?.length ? res : [];
        },
        delAllSearchColumn: (state) => {
            state.searchAllColumns = false; 
        },
    }
});

export const { setSearchText, setSearchColumn, delSearchColumn, setAllSearchColumn, delAllSearchColumn} = SearchSlice.actions;
export default SearchSlice.reducer;