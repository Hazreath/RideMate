import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./reducers/tokenReducer";

export default configureStore({
    reducer: {
        token: tokenReducer,
    },
});
