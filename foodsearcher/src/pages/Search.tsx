import React from 'react';
import { useLocation } from 'react-router-dom';
import { useGetRecipesByParamsQuery } from '../redux/recipeAPI';
import { PropState } from '../types/models';

export default function Search() {
  const location = useLocation();
  const { searchPath } = location.state as PropState;
  const { data = [] } = useGetRecipesByParamsQuery(searchPath);
  console.log(data);
  // дальнейший этап - добавление карточек товаров и добавление query в строку поиска
  return (
    <div>
      Результаты поиска
    </div>
  );
}
