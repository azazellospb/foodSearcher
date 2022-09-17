import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { signIn } from '../redux/userSlice';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './Auth.module.css';

export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [errorMsg, setMsg] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const user = new UserDataHandlerToLS();
    if (user.verifyLogin(email, password)) {
      setMsg('Вход выполнен успешно!');
      user.setCurrentUser(email);
      dispatch(signIn({ email }));
      navigate('/');
    } else {
      setMsg('Email или пароль неверны!');
    }
  }
  return (
    <section className={styles.signin}>
      <h2 className={styles.signin__title}>Sign in</h2>
      <form className={styles.signin__form} onSubmit={handleSubmit}>
        <div className={styles.signin__inputs}>
          <div>
            <label className={styles.signin__inputBlock} htmlFor="usermail">
              Email
              <input
                id="usermail"
                onChange={(event) => setEmail(event.target.value)}
                type="text"
                autoComplete="off"
                value={email}
              />
            </label>
          </div>
          <div>
            <label className={styles.signin__inputBlock} htmlFor="password">
              Password
              <input
                id="password"
                onChange={(event) => setPass(event.target.value)}
                type="text"
                autoComplete="off"
                value={password}
              />
            </label>
          </div>
        </div>
        <div className={styles.signin__buttons}>
          <button type="submit" className={styles.btn}>
            Войти
          </button>
        </div>
      </form>
      <p>{errorMsg}</p>
    </section>
  );
}
