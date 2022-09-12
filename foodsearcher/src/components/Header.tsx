import React from 'react';
import styles from './Header.module.css';
import LoginBlock from './LoginBlock';

export default function Header() {
  return (
    <header className={styles.header}>
      <LoginBlock />
    </header>
  );
}
