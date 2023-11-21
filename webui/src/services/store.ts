import {configureStore} from "@reduxjs/toolkit";
import brewlogApi from "./api/brewlogApi.ts";


const store = configureStore({
    reducer: {
        [brewlogApi.reducerPath]: brewlogApi.reducer
    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware()
        .concat(brewlogApi.middleware))
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
