import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: undefined,
};

/**
 * @deprecated
 * Store slice used for token, but as state is resetted on refresh, it was
 * not usable (error on my side, was learning about stores XD)
 * Token now uses Cookies
 */
export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        set: (state, newToken) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.token = newToken.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { set } = tokenSlice.actions;

export default tokenSlice.reducer;
