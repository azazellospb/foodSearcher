import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { recipeAPI } from './recipeAPI';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  userReducer,
  [recipeAPI.reducerPath]: recipeAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(recipeAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
