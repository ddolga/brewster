import {configureStore} from "@reduxjs/toolkit";
import brewlogApi from "./api/brewlogApi.ts";
import stuffsApi from "./api/stuffsApi.ts";


const store = configureStore({
    reducer: {
        [brewlogApi.reducerPath]: brewlogApi.reducer,
        [stuffsApi.reducerPath]: stuffsApi.reducer
    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware()
        .concat(brewlogApi.middleware,stuffsApi.middleware))
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
