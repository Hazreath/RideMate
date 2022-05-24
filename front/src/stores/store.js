import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducers/tokenReducer";
import tricklistReducer from "./reducers/tricklistReducer";
export default configureStore({
    reducer: {
        // token: tokenReducer,
        trickList: tricklistReducer,
    },
});
