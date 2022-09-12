
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginBlock.module.css';

export default function LoginBlock() {
  const navigate = useNavigate();
  const name = localStorage.getItem('userName') as string;

  const clearStorage = () => {
    navigate('/');
    document.location.reload();
  };

  if (name) {
    return (
      <div className={styles.login}>
        <span className={`${styles.userName}`}>{name}</span>
        <button className={styles.logoutBtn} type="button" onClick={clearStorage}>Выйти</button>
      </div>
    );
  }
  return (
    <div className={styles.login}>
      <Link to="/auth" style={{ lineHeight: '10px' }}>
        <span className={`${styles.loginBtn}`}>Войти</span>
      </Link>
    </div>
  );
}