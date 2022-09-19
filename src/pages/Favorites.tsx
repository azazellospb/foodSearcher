import React, { useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './Search.module.css';

export function Favorites() {
  const { email } = UserDataHandlerToLS.getCurrentUser();
  const favorites = UserDataHandlerToLS.getFavorites(email);
  const [, setState] = useState('');
  if (favorites.length > 0) {
    return (
      <div className={styles.results}>
        {favorites.map((item) => (
          <FavoriteCard
            key={item}
            refreshParent={setState}
            recipeId={item}
          />
        ))}
      </div>
    );
  } return (
    <div>
      Currently you haven&apos;t any favorites recipes!
    </div>
  );
}
