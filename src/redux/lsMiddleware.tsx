import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import UserDataHandlerToLS from '../utils/userDataWriter';
import { signIn } from './userSlice';

export const localStorageMiddleware = () => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
  if (signIn.match(action)) {
    const { email } = action.payload;
    UserDataHandlerToLS.setCurrentUser(email);
  }
  return next(action);
};
