import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trickList: [],
};

export const tlSlice = createSlice({
    name: "trickList",
    initialState,
    reducers: {
        /**
         *
         * @param {*} state
         * @param {*} newTL
         */
        set: (state, action) => {
            state.trickList = action.payload;
        },
        push: (state, action) => {
            state.trickList.push(action.payload);
        },
        /**
         *
         * @param {*} state
         * @param {*} checkedTrickId
         */
        check: (state, action) => {
            let checkedTrickId = action.payload;
            // console.log("CHECK: " + checkedTrickId);

            state.trickList.forEach((t) => {
                // console.log(t.name + " : " + t.done + "\t" + t._id);
                if (t._id === checkedTrickId) {
                    // console.log("Found ! " + t.name);
                    t.done = true;
                }
            });

            // console.log(state.trickList.find((t) => t.))
            // console.log(trick);
        },
    },
});

// Action creators are generated for each case reducer function
export const { set, push, check } = tlSlice.actions;

export default tlSlice.reducer;
