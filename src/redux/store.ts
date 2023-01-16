import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from './articlesApi';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    articlesApi.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
