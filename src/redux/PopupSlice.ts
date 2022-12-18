import { createSlice } from '@reduxjs/toolkit';

interface IPopapState {
    active: boolean,
}

const initialState: IPopapState = {
    active: false
};

const PopupSlice = createSlice({
    name: "popap",
    initialState,
    reducers: {
        activate: (state) => {
            state.active = true;
        },  
        deactivate: (state) => {
            state.active = false;
        },     
    }
});

export const { activate, deactivate} = PopupSlice.actions;
export default PopupSlice.reducer;