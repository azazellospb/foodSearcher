/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InferProps } from 'prop-types';
// import { Hit } from '../types/responceTypes';
import styles from './RecipeCard.module.css';
import { HitPropType } from '../types/propTypes';

function RecipeCard<Hit>(props: RecipeCardProps | { item: Hit }) {
  const navigate = useNavigate();
  const { item } = props as RecipeCardProps;
  const {
    _links,
    recipe,
  } = item;
  const image = recipe.image as string;
  const label = recipe.label as string;
  const source = recipe.source as string;
  const calories = recipe.calories as number;
  const recipeLink = _links.self.href.split('v2/')[1];
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.target as HTMLButtonElement;
    const recipeQuery = button.id;
    navigate('/recipe');
    sessionStorage.setItem('recipe', recipeQuery);
  };
  return (
    <div className={styles.card}>
      <img src={image as string} alt={label as string} />
      <h3>{label}</h3>
      <p>{`Recipe from: ${source}`}</p>
      <p>{`Total calories: ${calories.toFixed(0)}`}</p>
      <button id={recipeLink} type="button" onClick={(e) => handleClick(e)}>See details</button>
    </div>
  );
}

RecipeCard.propTypes = {
  item: HitPropType,
};
RecipeCard.defaultProps = {
  item: {},
};

type RecipeCardProps = InferProps<typeof RecipeCard.propTypes>;

export default RecipeCard;
