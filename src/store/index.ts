import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
    },
    // optional: enable serializable check loosening for AbortSignal if needed
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;