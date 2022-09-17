export interface UserData {
  name: string,
  email: string,
  password: string,
  status?: string,
  history: string[]
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

export interface PropState {
  searchPath: string;
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
