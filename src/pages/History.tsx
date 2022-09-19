/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import HistoryCard from '../components/HistoryCard';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './History.module.css';

export function History() {
  const user = new UserDataHandlerToLS();
  const { email } = user.getCurrentUser();
  const [, setState] = useState('');
  const userHistory = Array.from(new Set(user.getHistory(email)));
  if (userHistory.length !== 0) {
    return (
      <div className={styles.historyBlock}>
        {userHistory
          .map((item) => <HistoryCard refreshParent={setState} key={item} item={item} />)}
      </div>
    );
  } return <div>You haven&apos;t make any requests.</div>;
}
