import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResult, Hit } from '../types/responceTypes';

export const recipeAPI = createApi({
  reducerPath: 'recipeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.edamam.com/api/recipes/v2' }),
  endpoints: (builder) => ({
    getRecipeById: builder.query<Hit, string>({
      query: (recipeId) => `/${recipeId}?type=public&app_id=e7de9a05&app_key=cccfb4464ba349b4557a6013a27109bf`,
    }),
    getRecipesByParams: builder.query<SearchResult, string>({
      query: (searchQuery) => `?type=public${searchQuery}&app_id=e7de9a05&app_key=cccfb4464ba349b4557a6013a27109bf`,
    }),
  }),
});

export const { useGetRecipeByIdQuery, useGetRecipesByParamsQuery } = recipeAPI;

// export default searchDishes;

// const searchDishes = async (recipeUri: string) => {
//   const recipeId = recipeUri.split('recipe_')[1];
//   // С включением api_key и api_id через env пока не разоборался - похоже он работает при проде
//   const getDish = fetch(
//     `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=e7de9a05&app_key=cccfb4464ba349b4557a6013a27109bf`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-type': 'application/json',
//       },
//     },
//   ).then(async (res) => {
//     if (res.ok) {
//       return res.json();
//     } return Promise.reject(new Error(`Request cannot be processed: ${res.status}`));
//   // eslint-disable-next-line no-console
//   }).catch((error) => new Error(`Connection error: ${error}`));
//   const dishData: Hit = await getDish;
//   return dishData.recipe;
// };

// export default searchDishes;
