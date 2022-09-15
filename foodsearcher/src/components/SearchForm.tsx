/* eslint-disable prefer-const */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchForm.module.css';
import * as List from '../types/optionLists';
import Dropdown from './Dropdown';
import { makeUrl } from '../tools/urlMaker';

export default function SearchForm() {
  const [cuisineType, setCuisineType] = useState('');
  const [diet, setDiet] = useState('');
  const [mealType, setMealType] = useState('');
  const [dishType, setDishType] = useState('');
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  let [skip, setSkip] = useState(true);
  const params = {
    cuisineType,
    dishType,
    diet,
    mealType,
    q,
  };
  if (!params.q) params.q = 'i'; // necessary query key
  const urlWithQuery = makeUrl(params);
  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setQ(event.target.value);
  }
  function handleSubmit(event: React.FormEvent) {
    setSkip(false);
    event.preventDefault();
    navigate('/search', { replace: false, state: { searchPath: urlWithQuery } });
  }
  useEffect(() => {
    setSkip(true);
  }, [skip]);
  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <div>
        <div>
          <label htmlFor="dishtype">
            Type key word:
            <input type="input" value={q} onChange={handleInput} placeholder="Type your recipe here" />
          </label>
        </div>
        Possible filters:
        <br />
        <div>
          <label htmlFor="dishtype">
            Dish type
            <Dropdown value={dishType} onValueChange={(value) => setDishType(value)} placeHolder="Cuisine type" options={List.dishTypeList} />
          </label>
        </div>
        <br />
        <label htmlFor="cuisineType">
          Cuisine type
          <Dropdown value={cuisineType} onValueChange={(value) => setCuisineType(value)} placeHolder="Cuisine type" options={List.cuisineTypeList} />
        </label>
        <br />
        <label htmlFor="dietType">
          Diet type
          <Dropdown value={diet} onValueChange={(value) => setDiet(value)} placeHolder="Diet type" options={List.dietList} />
        </label>
        <br />
        <label htmlFor="mealType">
          Meal type
          <Dropdown value={mealType} onValueChange={(value) => setMealType(value)} placeHolder="Meal type" options={List.mealTypeList} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
