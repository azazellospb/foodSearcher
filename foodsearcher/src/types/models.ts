export interface UserData {
  name: string,
  email: string,
  password: string,
  status?: string,
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
