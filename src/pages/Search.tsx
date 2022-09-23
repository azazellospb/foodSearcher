/* eslint-disable no-nested-ternary */
import { SerializedError } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useGetRecipesByParamsQuery } from '../redux/recipeAPI';
import { addHistory } from '../redux/userSlice';
import { SearchResult } from '../types/responceTypes';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './Search.module.css';

export default function Search() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email } = UserDataHandlerToLS.getCurrentUser();
  const [currentPage, setCurrentPage] = useState('');
  const [, setSearchParams] = useSearchParams();
  const historyArr = useAppSelector((state) => state.userReducer.user.history);
  let lastUserPage = historyArr[historyArr.length - 1];
  if (lastUserPage) {
    UserDataHandlerToLS.setHistory(email, lastUserPage);
  } else {
    lastUserPage = UserDataHandlerToLS.getLastQuery(email);
  }
  const startPage = lastUserPage.split('&').filter((x) => !x.includes('_cont')).join('&');
  const isFirstPage = !!lastUserPage.split('&').filter((x) => x.includes('_cont')).length;
  const [isFirst, setFirstPageStat] = useState(isFirstPage);
  useEffect(() => {
    const obj = new URLSearchParams(lastUserPage);
    setSearchParams(obj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUserPage]);

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
    setFirstPageStat(true);
  };
  const navigateToMain = () => {
    navigate('/');
  };

  const handleToStartClick = () => {
    setCurrentPage(startPage);
    setFirstPageStat(false);
  };
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
                <button type="button" onClick={navigateToMain}>To search panel</button>
                {isFirst && (<button type="button" onClick={handleToStartClick}>To first page</button>)}
                <button type="button" onClick={handleNextPageClick}>Next page</button>
              </div>
            )}
          </section>
          <section className={styles.results}>
            {results.hits
              .map((item) => <RecipeCard key={item.recipe.image} item={item} />)}
          </section>
        </>
      ) : null}
    </div>
  );
}

// export default Search;
