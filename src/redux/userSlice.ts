/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../types/models';

const initialState: UserState = {
  isOnline: false,
  user: {
    email: '',
    favourites: [],
    history: [],
    name: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isOnline = true;
      state.user.email = action.payload;
    },
    signOut: (state) => {
      state.isOnline = false;
      state.user = {
        email: '',
        favourites: [],
        history: [],
        name: '',
      };
    },
    addFavourite(state, action) {
      state.user.favourites.push(action.payload);
    },

    removeFavourite(state, action) {
      state.user.favourites = state.user.favourites.filter((id) => id !== action.payload);
    },

    addHistory(state, action) {
      state.user.history.push(action.payload);
    },
    removeHistory(state) {
      state.user.history = [];
    },
  },
});
/* eslint-disable object-curly-newline */

export const {
  signIn,
  signOut,
  addFavourite,
  removeFavourite,
  addHistory,
  removeHistory,
} = userSlice.actions;

export default userSlice.reducer;
