/* eslint-disable no-nested-ternary */
import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserAppContext } from '../context/userContext';
import { useAppDispatch } from '../redux/hooks';
import { useGetRecipeByIdQuery } from '../redux/recipeAPI';
import { addFavorite, removeFavourite } from '../redux/userSlice';
import { UserContext } from '../types/models';
import { Hit } from '../types/responceTypes';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './Recipe.module.css';

export default function Recipe() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email } = UserDataHandlerToLS.getCurrentUser();
  const recipeQuery = sessionStorage.getItem('recipe') || '';
  const {
    isLoading,
  } = useGetRecipeByIdQuery(recipeQuery);
  const { favorites, setFavorites } = useContext(UserAppContext) as UserContext;
  const error = useGetRecipeByIdQuery(recipeQuery).error as SerializedError;
  const data = useGetRecipeByIdQuery(recipeQuery).data as Hit || { recipe: '' };
  const recipeData = data as Hit;
  let isFavorite = false;
  if (email) {
    isFavorite = UserDataHandlerToLS.getFavorites(email).indexOf(recipeQuery) !== -1;
  }
  const [favourStatus, SetFavourStatus] = useState(isFavorite);
  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    const obj = new URLSearchParams(recipeQuery);
    setSearchParams(obj);
  }, [recipeQuery, setSearchParams]);
  if (recipeData.recipe) {
    const {
      recipe,
    } = recipeData;
    const {
      image,
      label,
      dietLabels,
      mealType,
      ingredientLines,
      dishType,
      cuisineType,
      digest,
    } = recipe;
    const getRate = (i:number) => (!Number.isNaN(digest[i].total / digest[i].daily) ? (digest[i].total / digest[i].daily).toFixed(2) : ' - ');
    const fatRate = getRate(0);
    const chardsRate = getRate(1);
    const proteinRate = getRate(2);
    const cholesterolRate = getRate(3);
    const servings = recipe.yield;
    const toggleFavorStat = () => {
      if (!favourStatus) {
        dispatch(addFavorite(recipeQuery));
        UserDataHandlerToLS.addToFavorites(email, recipeQuery);
        setFavorites(favorites + 1);
      } else {
        dispatch(removeFavourite(recipeQuery));
        UserDataHandlerToLS.deleteFromFavorites(email, recipeQuery);
        setFavorites(favorites - 1);
      }
      SetFavourStatus(!favourStatus);
    };
    const backLink = () => navigate(-2);
    return (
      <div>
        { isLoading ? (
          <span>Loading...</span>
        ) : error ? (
          <b>
            {'There\'s an error:'}
            {error.message}
          </b>
        ) : data ? (
          <>
            <button type="button" onClick={backLink}>Back</button>
            <div className={styles.recipeBlock}>
              <span>{label}</span>
              {favourStatus && ('In favorites')}
              <div className={styles.recipeBlock__top}>
                <img src={image} alt={label} />
                <div className={styles.ingredients}>
                  <span>{`Dish type: ${dishType}. `}</span>
                  <span>{`Cuisine type: ${cuisineType}. `}</span>
                  <span>{`Meal type: ${mealType}. `}</span>
                  <div>Ingredients:</div>
                  {ingredientLines.map((ingredient) => <div key={ingredient}>{ingredient}</div>)}
                  {email && (
                    <button type="button" id={recipeQuery} onClick={toggleFavorStat}>
                      {!favourStatus && ('Add to favorites')}
                      {favourStatus && ('Remove from favorites')}
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.recipeBlock__mainInfo}>
                <div className={styles.recipeBlock__rates}>
                  <span>{`Fat daily rate: ${fatRate}%`}</span>
                  <span>{`Chards daily rate: ${chardsRate}%`}</span>
                  <span>{`Protein daily rate: ${proteinRate}%`}</span>
                  <span>{`Cholesterol daily rate: ${cholesterolRate}%`}</span>
                  <span>{`Servings: ${servings}`}</span>
                </div>
                <div>
                  Diets:
                  {dietLabels.map((diet) => <div key={diet}>{diet}</div>)}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  } return <div>Loading...</div>;
}
