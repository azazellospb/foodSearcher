/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppDispatch } from '../redux/hooks';
import { addHistory } from '../redux/userSlice';
import { objMaker } from '../tools/objMaker';
import { makeUrl } from '../tools/urlMaker';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './HistoryCard.module.css';

function HistoryCard(props: {
  item: string,
  refreshParent: (parentState: string) => void,
}) {
  const { item, refreshParent } = props;

  const { email } = UserDataHandlerToLS.getCurrentUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [keyArr, valArr] = objMaker(item);
  const keyHandler = (key: string) => {
    if (key === 'q') return 'Your search';
    if (key.includes('Type')) return key.replace('T', ' t');
    return key;
  };
  const handleSearch = () => {
    const query = makeUrl(item);
    dispatch(addHistory(query));
    navigate('/search');
  };
  const handleDelete = () => {
    UserDataHandlerToLS.removeFromHistory(email, item);
    refreshParent(item);
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

HistoryCard.propTypes = {
  item: PropTypes.string.isRequired,
};

export default HistoryCard;
