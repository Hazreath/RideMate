import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducers/tokenReducer";
import tricklistReducer from "./reducers/tricklistReducer";

/**
 * RideMate React/Redux|Redux-toolkit Store
 * Allows to handle global variables
 * Currently contains the tricklist, used across various pages
 */
export default configureStore({
    reducer: {
        // token: tokenReducer,
        trickList: tricklistReducer,
    },
});
