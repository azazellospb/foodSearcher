import React, { useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './Search.module.css';

export function Favorites() {
  const user = new UserDataHandlerToLS();
  const { email } = user.getCurrentUser();
  const favorites = user.getFavorites(email);
  const [, setState] = useState('');
  if (favorites.length > 0) {
    return (
      <div className={styles.results}>
        {favorites.map((item) => <FavoriteCard callback={setState} recipeId={item} />)}
      </div>
    );
  } return (
    <div>
      Currently you haven&apos;t any favorites recipes!
    </div>
  );
}
