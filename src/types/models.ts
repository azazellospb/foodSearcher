import { UseFormRegisterReturn } from 'react-hook-form';

export interface UserData {
  name: string,
  email: string,
  password: string,
  status?: string,
  history: string[],
  favorites: string[],
}

export interface QueryToObject {
  [key:string]: string
}
export interface QueryParams {
  dishType?: string,
  calories?: string,
  q?: string,
  ingredients?: string,
  diet?: string,
  cuisineType?: string,
  mealType?: string,
  time?: string,
}

export interface UserState {
  isOnline: boolean
  user: User,
}

interface User {
  email: string,
  favourites: string[],
  history: string[],
  name: string,
}

export interface DropDownProps {
  placeHolder: string,
  options: string[],
  formRegister: UseFormRegisterReturn<string>
}
