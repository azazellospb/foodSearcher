/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { objMaker } from '../tools/objMaker';
import styles from './HistoryCard.module.css';

function HistoryCard(props: HistoryCardProps) {
  const { item, refreshParent, searchHistory } = props;
  const [keyArr, valArr] = objMaker(item);
  const keyHandler = (key: string) => {
    if (key === 'q') return 'Your search';
    if (key.includes('Type')) return key.replace('T', ' t');
    return key;
  };
  return (
    <div className={styles.searchQueryBlock}>
      <div>
        {keyArr.map((key, i) => <span key={key}>{`${keyHandler(key)}: ${valArr[i]}${(i + 1 > keyArr.length - 1) ? '' : '; '}`}</span>)}
      </div>
      <div className={styles.buttonBlock}>
        <button type="submit" onClick={() => searchHistory(item)}>open results</button>
        <button type="submit" onClick={() => refreshParent(item)}>delete</button>
      </div>

    </div>
  );
}

HistoryCard.propTypes = {
  item: PropTypes.string.isRequired,
  refreshParent: PropTypes.func.isRequired,
  searchHistory: PropTypes.func.isRequired,
};

type HistoryCardProps = InferProps<typeof HistoryCard.propTypes>;

export default HistoryCard;
