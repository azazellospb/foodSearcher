import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './Auth.module.css';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [errorMsg, setMsg] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const user = new UserDataHandlerToLS();
    if (user.verifyLogin(email, password)) {
      setMsg('Вход выполнен успешно!');
      user.setCurrentUser(email);
      navigate('/');
    } else {
      setMsg('Email или пароль неверны!');
    }
  }
  return (
    <section>
      <h2>Войти</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="usermail">
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
            <label htmlFor="password">
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
        <div>
          <button type="submit" className={styles.btn}>
            Войти
          </button>
        </div>
      </form>
      <p>{errorMsg}</p>
    </section>
  );
}
