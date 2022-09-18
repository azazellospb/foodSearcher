import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetRecipeByIdQuery } from '../redux/recipeAPI';
import { Hit } from '../types/responceTypes';
import styles from './Recipe.module.css';

export function Recipe() {
  const recipeQuery = sessionStorage.getItem('recipe') || '';
  const {
    data = { recipe: '' },
  } = useGetRecipeByIdQuery(recipeQuery);
  const recipeData = data as Hit;
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
    return (
      <div className={styles.recipeBlock}>
        <span>{label}</span>
        <div className={styles.recipeBlock__top}>
          <img src={image} alt={label} />

          <div className={styles.ingredients}>
            <span>{`Dish type: ${dishType}. `}</span>
            <span>{`Cuisine type: ${cuisineType}. `}</span>
            <span>{`Meal type: ${mealType}. `}</span>
            Ingredients:
            {ingredientLines.map((ingredient) => <div>{ingredient}</div>)}
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
    );
  } return <div>Loading...</div>;
}
