/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hit } from '../types/responceTypes';
import styles from './RecipeCard.module.css';

export default function RecipeCard(props: { item: Hit }) {
  const navigate = useNavigate();
  const { item } = props;
  const {
    _links,
    recipe,
  } = item;
  const {
    image,
    label,
    source,
    calories,
  } = recipe;
  const recipeLink = _links.self.href.split('v2/')[1];
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.target as HTMLButtonElement;
    const recipeQuery = button.id;
    navigate('/recipe');
    sessionStorage.setItem('recipe', recipeQuery);
  };
  return (
    <div className={styles.card}>
      <img src={image} alt={label} />
      <h3>{label}</h3>
      <p>{`Recipe from: ${source}`}</p>
      <p>{`Total calories: ${calories.toFixed(0)}`}</p>
      <button id={recipeLink} type="button" onClick={(e) => handleClick(e)}>See details</button>
    </div>
  );
}
