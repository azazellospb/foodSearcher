/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './SearchForm.module.css';
import * as List from '../types/optionLists';
import Dropdown from './Dropdown';
import { QueryParams } from '../types/models';
import { makeUrl } from '../tools/urlMaker';
import { useAppDispatch, useDebounce } from '../redux/hooks';
import { addHistory } from '../redux/userSlice';
import { useGetSuggestsQuery } from '../redux/recipeAPI';
// import { debounce } from '../tools/debouncer';

export default function SearchForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [queryVal, setQueryVal] = useState('');
  const [suggests, setSuggests] = useState(['']);
  const [displaySuggests, setDisplaySuggests] = useState(false);
  const { register, handleSubmit, getValues } = useForm<QueryParams>({
    defaultValues: {
      q: searchParams.get('q') ?? '',
      cuisineType: searchParams.get('cuisineType') ?? '',
      dishType: searchParams.get('dishType') ?? '',
      diet: searchParams.get('diet') ?? '',
      mealType: searchParams.get('mealType') ?? '',
    },
  });
  const { data = [] } = useGetSuggestsQuery(makeUrl(`&q=${queryVal}`));

  useEffect(() => {
    setSuggests(data);
    setDisplaySuggests(true);
    if (data.length === 0) setDisplaySuggests(false);
  }, [data]);

  function onSubmit(obj: QueryParams) {
    const newObj = { ...obj };
    const query = makeUrl(newObj as QueryParams);

    dispatch(addHistory(query));
    navigate('/search');
  }

  const makeSuggestSearch = (
    e: React.MouseEvent<HTMLOptionElement, MouseEvent>,
  ) => {
    const option = e.target as HTMLOptionElement;
    const optionText = option.innerHTML;
    const query = makeUrl(`&q=${optionText}`);
    dispatch(addHistory(query));
    navigate('/search');
  };

  const handleInput = () => {
    setQueryVal(getValues('q') || '');
  };
  const debouncedSearch = useDebounce(handleInput, 2000);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      Please set up search parameters
      <div>
        <div>
          <label className={styles.label} htmlFor="dishtype">
            Type key word:
            <input
              type="input"
              {...register('q', {
                required: true,
                minLength: {
                  value: 3,
                  message: '3 letters minimum',
                },
                setValueAs: (v) => v.toLowerCase(),
              })}
              autoComplete="off"
              placeholder="3 letters minimum"
              onInput={() => debouncedSearch}
              onClick={() => setDisplaySuggests(false)}
            />
            {displaySuggests && (
              <div className={styles.suggestBlock}>
                {suggests
                  .map((item) => <option onClick={makeSuggestSearch} key={item}>{item}</option>)}
              </div>
            )}
          </label>
        </div>
        <label className={styles.label} htmlFor="dishType">
          Dish type
          <Dropdown formRegister={register('dishType')} placeHolder="dish type" options={List.dishTypeList} />
        </label>
        <label className={styles.label} htmlFor="cuisineType">
          Cuisine type
          <Dropdown formRegister={register('cuisineType')} placeHolder="cuisine type" options={List.cuisineTypeList} />
        </label>
        <label className={styles.label} htmlFor="dietType">
          Diet type
          <Dropdown formRegister={register('diet')} placeHolder="diet" options={List.dietList} />
        </label>
        <label className={styles.label} htmlFor="mealType">
          Meal type
          <Dropdown formRegister={register('mealType')} placeHolder="meal type" options={List.mealTypeList} />
        </label>
      </div>
      <button type="submit">Searh</button>
    </form>
  );
}
