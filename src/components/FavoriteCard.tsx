/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { useGetRecipeByIdQuery } from '../redux/recipeAPI';
import { addFavorite, removeFavourite } from '../redux/userSlice';
import { Hit } from '../types/responceTypes';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './RecipeCard.module.css';

export default function FavoriteCard(props: {
  recipeId: string,
  callback: (parentState: string) => void,
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { recipeId, callback } = props;

  const user = new UserDataHandlerToLS();
  const { email } = user.getCurrentUser();
  const isFavorite = user.getFavorites(email).indexOf(recipeId) !== -1;

  const {
    data = { recipe: '' },
  } = useGetRecipeByIdQuery(recipeId);
  const recipeData = data as Hit;
  if (recipeData.recipe) {
    const {
      recipe,
    } = recipeData;
    const {
      label,
      image,
      source,
      calories,
    } = recipe;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const button = event.target as HTMLButtonElement;
      const recipeQuery = button.id;
      navigate('/recipe');
      sessionStorage.setItem('recipe', recipeQuery);
    };
    const toggleFavorStat = () => {
      if (!isFavorite) {
        dispatch(addFavorite(recipeId));
        user.addToFavorites(email, recipeId);
      } else {
        dispatch(removeFavourite(recipeId));
        user.deleteFromFavorites(email, recipeId);
        callback(recipeId);
      }
    };
    return (
      <div className={styles.card}>
        <img src={image} alt={label} />
        <h3>{label}</h3>
        <p>{`Recipe from: ${source}`}</p>
        <p>{`Total calories: ${calories.toFixed(0)}`}</p>
        <button id={recipeId} type="button" onClick={(e) => handleClick(e)}>See details</button>
        <button type="button" onClick={toggleFavorStat}>
          {!isFavorite && ('Add to favorites')}
          {isFavorite && ('Remove from favorites')}
        </button>
      </div>
    );
  } return (<div>Loading...</div>);
}
