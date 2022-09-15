import { configureStore } from '@reduxjs/toolkit';
import { recipeAPI } from './recipeAPI';

export const store = configureStore({
  reducer: {
    [recipeAPI.reducerPath]: recipeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipeAPI.middleware),
});
