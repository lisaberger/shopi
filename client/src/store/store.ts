import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';
import filterReducer from './slices/filterSlice';
import cartSliceReducer from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        cart: cartSliceReducer,
        filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
