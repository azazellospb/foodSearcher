/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './SearchForm.module.css';
import * as List from '../types/optionLists';
import Dropdown from './Dropdown';
import { QueryParams } from '../types/models';
import { makeUrl } from '../tools/urlMaker';
import { useAppDispatch } from '../redux/hooks';
import { addHistory } from '../redux/userSlice';

export default function SearchForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { register, handleSubmit } = useForm<QueryParams>({
    defaultValues: {
      q: searchParams.get('q') ?? '',
      cuisineType: searchParams.get('cuisineType') ?? '',
      dishType: searchParams.get('dishType') ?? '',
      diet: searchParams.get('diet') ?? '',
      mealType: searchParams.get('mealType') ?? '',
    },
  });
  function onSubmit(obj: QueryParams) {
    const newObj = { ...obj };
    navigate('/search');
    const query = makeUrl(newObj as QueryParams);
    dispatch(addHistory(query));
  }
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      Please set up search parameters
      <div>
        <div>
          <label htmlFor="dishtype">
            Type key word:
            <input type="input" {...register('q')} autoComplete="off" placeholder="Type your recipe here" />
          </label>
        </div>
        <label htmlFor="dishType">
          Dish type
          <Dropdown onValueChange={register('dishType')} placeHolder="dish type" options={List.dishTypeList} />
        </label>
        <label htmlFor="cuisineType">
          Cuisine type
          <Dropdown onValueChange={register('cuisineType')} placeHolder="cuisine type" options={List.cuisineTypeList} />
        </label>
        <label htmlFor="dietType">
          Diet type
          <Dropdown onValueChange={register('diet')} placeHolder="diet" options={List.dietList} />
        </label>
        <label htmlFor="mealType">
          Meal type
          <Dropdown onValueChange={register('mealType')} placeHolder="meal type" options={List.mealTypeList} />
        </label>
      </div>
      <button type="submit">Searh</button>
    </form>
  );
}