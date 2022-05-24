import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trickList: [],
};

export const tlSlice = createSlice({
    name: "trickList",
    initialState,
    reducers: {
        set: (state, newTL) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // console.log(newTL);
            state.trickList = newTL.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { set } = tlSlice.actions;

export default tlSlice.reducer;
