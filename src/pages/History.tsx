/* eslint-disable react/no-array-index-key */
import React from 'react';
import HistoryCard from '../components/HistoryCard';
import { historyFilter } from '../tools/historyFilter';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './History.module.css';

export function History() {
  const user = new UserDataHandlerToLS();
  const { email } = user.getCurrentUser();
  const userHistory = Array.from(new Set(user.getHistory(email)));
  const uniqueHistory = historyFilter(userHistory);
  return (
    <div className={styles.historyBlock}>
      {uniqueHistory
        .map((item) => <HistoryCard key={item} item={item} />)}
    </div>
  );
}
