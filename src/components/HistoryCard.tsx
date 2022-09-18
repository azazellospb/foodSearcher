/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { objMaker } from '../tools/objMaker';
import styles from './HistoryCard.module.css';

export default function HistoryCard(props: { item: string }) {
  const { item } = props;
  const [keyArr, valArr] = objMaker(item);
  const keyHandler = (key: string) => {
    if (key === 'q') return 'Your search';
    if (key.includes('Type')) return key.replace('T', ' t');
    return key;
  };
  const handleSearch = () => {
    console.log('!');
  };
  const handleDelete = () => {
    console.log('!');
  };

  return (
    <div className={styles.searchQueryBlock}>
      <div>
        {keyArr.map((key, i) => <span key={key}>{`${keyHandler(key)}: ${valArr[i]}${(i + 1 > keyArr.length - 1) ? '' : '; '}`}</span>)}
      </div>
      <div className={styles.buttonBlock}>
        <button type="submit" onClick={handleSearch}>open results</button>
        <button type="submit" onClick={handleDelete}>delete</button>
      </div>

    </div>
  );
}
