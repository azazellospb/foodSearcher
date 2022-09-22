import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAppContext } from '../context/userContext';
import { UserContext } from '../types/models';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './LoginBlock.module.css';

export default function LoginBlock() {
  const { favorites } = useContext(UserAppContext) as UserContext;
  const numbers = favorites;
  const navigate = useNavigate();
  const { name } = UserDataHandlerToLS.getCurrentUser();
  const logOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/signin');
  };

  if (name) {
    return (
      <div className={styles.login}>
        <span className={styles.userName}>{name}</span>
        <Link to="/favorites" className={styles.loginBtn}>
          Favorites
          {` (${numbers})`}
        </Link>
        <Link to="/history" className={styles.loginBtn}>Search history</Link>
        <button className={styles.logoutBtn} type="button" onClick={logOut}>Log out</button>
      </div>
    );
  }
  return (
    <div className={styles.loginblock}>
      <Link to="/signup" className={styles.loginBtn}>Sign up</Link>
      <Link to="/signin" className={styles.loginBtn}>Sign in</Link>
    </div>
  );
}
