import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResult, Hit } from '../types/responceTypes';

export const recipeAPI = createApi({
  reducerPath: 'recipeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.edamam.com/api/recipes/v2' }),
  endpoints: (builder) => ({
    getRecipeById: builder.query<Hit, string>({
      query: (recipeId) => `/${recipeId}`,
    }),
    getRecipesByParams: builder.query<SearchResult, string>({
      query: (searchQuery) => `?type=public${searchQuery}`,
    }),
    getSuggests: builder.query<string[], string>({
      query: (searchQuery) => `?type=public${searchQuery}`,
      transformResponse: (response: SearchResult) => {
        const result: string[] = [];
        response.hits.slice(0, 5).map((item) => result.push(item.recipe.label));
        return result;
      },

    }),
  }),
});

export const {
  useGetRecipeByIdQuery,
  useGetRecipesByParamsQuery,
  useGetSuggestsQuery,
} = recipeAPI;
