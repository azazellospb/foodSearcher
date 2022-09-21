/* eslint-disable no-nested-ternary */
import { SerializedError } from '@reduxjs/toolkit';
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
  const startPage = lastUserPage.split('&').filter((x) => !x.includes('_cont')).join('&');
  if (lastUserPage) {
    UserDataHandlerToLS.setHistory(email, lastUserPage);
  } else {
    lastUserPage = UserDataHandlerToLS.getLastQuery(email);
  }

  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const obj = new URLSearchParams(lastUserPage);
    setSearchParams(obj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUserPage]);

  const [currentPage, setCurrentPage] = useState('');

  let query = lastUserPage;
  if (currentPage && (currentPage !== lastUserPage)) {
    query = currentPage;
  }

  const {
    isLoading,
  } = useGetRecipesByParamsQuery(query);
  const error = useGetRecipesByParamsQuery(query).error as SerializedError;
  const data = useGetRecipesByParamsQuery(query).data as SearchResult || [];
  const results = data as SearchResult;

  const handleNextPageClick = () => {
    const nextPageLink = results._links.next.href;
    const nextPageQuery = `&${nextPageLink.split('?')[1].replace('&type=public', '')}`;
    UserDataHandlerToLS.setHistory(email, nextPageQuery);
    dispatch(addHistory(nextPageQuery));
    setCurrentPage(nextPageQuery);
  };

  const handleToStartClick = () => setCurrentPage(startPage);
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
          <section className={styles.header}>
            <span>{`Total results: ${results.count}`}</span>
            {(results.count > 20) && (
              <div className={styles.controls}>
                <button type="button" onClick={handleToStartClick}>Back to first page</button>
                <button type="button" onClick={handleNextPageClick}>Next page</button>
              </div>
            )}
          </section>
          <section className={styles.results}>
            {
              results.hits
                .map(
                  (item, i) => <RecipeCard key={results.hits[i].recipe.image} item={item} />,
                )
            }
          </section>
        </>
      ) : null}
    </div>
  );
}
