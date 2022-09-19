import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useGetRecipesByParamsQuery } from '../redux/recipeAPI';
import { addHistory } from '../redux/userSlice';
import { SearchResult } from '../types/responceTypes';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './Search.module.css';

export function Search() {
  const dispatch = useAppDispatch();

  const { email } = UserDataHandlerToLS.getCurrentUser();

  const historyArr = useAppSelector((state) => state.userReducer.user.history);

  let lastUserPage = historyArr[historyArr.length - 1];
  if (lastUserPage) {
    UserDataHandlerToLS.setHistory(email, lastUserPage);
  } else {
    lastUserPage = UserDataHandlerToLS.getLastQuery(email);
  }

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const obj = new URLSearchParams(lastUserPage);
    setSearchParams(obj);
  }, [lastUserPage, setSearchParams]);

  const [currentPage, setCurrentPage] = useState('');

  let query = lastUserPage;
  if (currentPage && (currentPage !== lastUserPage)) {
    query = currentPage;
  }

  const {
    data = [],
  } = useGetRecipesByParamsQuery(query);
  const results = data as SearchResult;

  const handleNextPageClick = () => {
    const nextPageLink = results._links.next.href;
    const nextPageQuery = `&${nextPageLink.split('?')[1].replace('&type=public', '')}`;
    UserDataHandlerToLS.setHistory(email, nextPageQuery);
    dispatch(addHistory(nextPageQuery));
    setCurrentPage(nextPageQuery);
  };

  const handleToStartClick = () => setCurrentPage(lastUserPage);

  if (results.count) {
    return (
      <>
        <section className={styles.header}>
          <span>{`Total results: ${results.count}`}</span>
          <div className={styles.controls}>
            <button type="button" onClick={handleToStartClick}>Back to first page</button>
            <button type="button" onClick={handleNextPageClick}>Next page</button>
          </div>
        </section>
        <section className={styles.results}>
          {
            results.hits
              .map(
                (item, index) => <RecipeCard key={results.hits[index].recipe.image} item={item} />,
              )
          }
        </section>
      </>
    );
  } return (
    <p>Loading...</p>
  );
}
