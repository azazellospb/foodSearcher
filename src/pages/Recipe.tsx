import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { useGetRecipeByIdQuery } from '../redux/recipeAPI';
import { addFavorite, removeFavourite } from '../redux/userSlice';
import { Hit } from '../types/responceTypes';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './Recipe.module.css';

export function Recipe() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = new UserDataHandlerToLS();
  const { email } = user.getCurrentUser();
  const recipeQuery = sessionStorage.getItem('recipe') || '';
  const {
    data = { recipe: '' },
  } = useGetRecipeByIdQuery(recipeQuery);
  const recipeData = data as Hit;
  const isFavorite = user.getFavorites(email).indexOf(recipeQuery) !== -1;
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
        user.addToFavorites(email, recipeQuery);
      } else {
        dispatch(removeFavourite(recipeQuery));
        user.deleteFromFavorites(email, recipeQuery);
      }
      SetFavourStatus(!favourStatus);
    };
    const backLink = () => navigate(-2);
    return (
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
              Ingredients:
              {ingredientLines.map((ingredient) => <div>{ingredient}</div>)}
              <button type="button" id={recipeQuery} onClick={toggleFavorStat}>
                {!favourStatus && ('Add to favorites')}
                {favourStatus && ('Remove from favorites')}
              </button>
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
              {dietLabels.map((diet) => <div>{diet}</div>)}
            </div>
          </div>
        </div>
      </>
    );
  } return <div>Loading...</div>;
}
