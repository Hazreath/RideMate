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
            // console.log("PUSHING");
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
        remove: (state, action) => {
            // console.log("REMOVE IN REDUCER");
            let deletedTrickId = action.payload;
            let i;
            for (
                i = 0;
                i < state.trickList.length &&
                state.trickList[i]._id != deletedTrickId;
                i++
            );

            if (i < state.trickList.length) {
                // found
                state.trickList.splice(i, 1);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { set, push, check, remove } = tlSlice.actions;

export default tlSlice.reducer;
