import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import LoginBlock from './LoginBlock';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/"><h1 className={styles.logo}>Food Searcher</h1></Link>
      <LoginBlock />
    </header>
  );
}
