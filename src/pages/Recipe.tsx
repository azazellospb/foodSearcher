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
    const fatRate = !Number.isNaN(digest[0].total / digest[0].daily) ? (digest[0].total / digest[0].daily).toFixed(2) : ' - ';
    const chardsRate = !Number.isNaN(digest[1].total / digest[1].daily) ? (digest[1].total / digest[1].daily).toFixed(2) : ' - ';
    const proteinRate = !Number.isNaN(digest[2].total / digest[2].daily) ? (digest[2].total / digest[2].daily).toFixed(2) : ' - ';
    const cholesterolRate = !Number.isNaN(digest[3].total / digest[3].daily) ? (digest[3].total / digest[3].daily).toFixed(2) : ' - ';
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
