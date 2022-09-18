import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer
      className={styles.footer}
    >
      <span>React intensive</span>
      <span>
        Made by
        {' '}
        <a href="https://github.com/azazellospb">Anton Ivanov</a>
        , 2022
      </span>
    </footer>
  );
}
