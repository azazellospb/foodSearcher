import { createContext } from 'react';
import { FavoritesContext } from '../types/models';

export const FavorQuantityContext = createContext<FavoritesContext | null>(null);
