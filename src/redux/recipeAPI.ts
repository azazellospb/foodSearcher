import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResult, Hit } from '../types/responceTypes';

export const recipeAPI = createApi({
  reducerPath: 'recipeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.edamam.com/api/recipes/v2' }),
  endpoints: (builder) => ({
    getRecipeById: builder.query<Hit, string>({
      query: (recipeId) => `/${recipeId}?`,
    }),
    getRecipesByParams: builder.query<SearchResult, string>({
      query: (searchQuery) => `?type=public${searchQuery}`,
    }),
  }),
});

export const {
  useGetRecipeByIdQuery,
  useGetRecipesByParamsQuery,
} = recipeAPI;
