import { createContext } from 'react';
import { UserContext } from '../types/models';

export const UserAppContext = createContext<UserContext | null>(null);
