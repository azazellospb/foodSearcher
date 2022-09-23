/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryCard from '../components/HistoryCard';
import { useAppDispatch } from '../redux/hooks';
import { addHistory } from '../redux/userSlice';
import { makeUrl } from '../tools/urlMaker';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './History.module.css';

export function History() {
  const { email } = UserDataHandlerToLS.getCurrentUser();
  const [, setState] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const refreshParent = (item: string) => {
    setState(item);
    UserDataHandlerToLS.removeFromHistory(email, item);
  };
  const searchHistory = (item: string) => {
    const query = makeUrl(item);
    dispatch(addHistory(query));
    navigate('/search');
  };
  const userHistory = Array.from(new Set(UserDataHandlerToLS.getHistory(email)));
  if (userHistory.length !== 0) {
    return (
      <div className={styles.historyBlock}>
        {userHistory
          .map((item) => (
            <HistoryCard
              refreshParent={refreshParent}
              searchHistory={searchHistory}
              key={item}
              item={item}
            />
          ))}
      </div>
    );
  } return <div>You haven&apos;t make any requests.</div>;
}
