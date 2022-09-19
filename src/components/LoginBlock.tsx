import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './LoginBlock.module.css';

export default function LoginBlock() {
  const navigate = useNavigate();
  const { name } = UserDataHandlerToLS.getCurrentUser();
  const logOut = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (name) {
    return (
      <div className={styles.login}>
        <span className={styles.userName}>{name}</span>
        <Link to="/favorites" className={styles.loginBtn}>Favorites</Link>
        <Link to="/history" className={styles.loginBtn}>Search history</Link>
        <button className={styles.logoutBtn} type="button" onClick={logOut}>Выйти</button>
      </div>
    );
  }
  return (
    <div className={styles.loginblock}>
      <Link to="/signup" className={styles.loginBtn}>Регистрация</Link>
      <Link to="/signin" className={styles.loginBtn}>Вход</Link>
    </div>
  );
}
