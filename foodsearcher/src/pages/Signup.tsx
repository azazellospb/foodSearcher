import React, { useState } from 'react';
import { verifyUserData } from '../tools/verifier';
import UserDataHandlerToLS from '../utils/userDataWriter';
import styles from './Auth.module.css';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [errorMsg, setMsg] = useState('');
  const [signupStatus, SetSignupStatus] = useState(true);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const user = new UserDataHandlerToLS();
    const userDataCheck = verifyUserData(password, name, email);
    const doesUserExist = user.hasSuchUser(email);
    if (doesUserExist) {
      setMsg('Such user already exist.');
    } else if (!userDataCheck) {
      setMsg('Please check your input data.');
    } else if (userDataCheck && !doesUserExist) {
      setName('');
      setEmail('');
      setPass('');
      const userData = {
        email,
        name,
        password,
        history: [],
      };
      user.setUserData(userData);
      SetSignupStatus(false);
    }
  }

  return (signupStatus
    ? (
      <section className={styles.signin}>
        <h2 className={styles.signin__title}>Sign up</h2>
        <form className={styles.signin__form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.signin__inputBlock} htmlFor="username">
              Name
              <input type="text" required id="username" autoComplete="off" value={name} onChange={(event) => { setName(event.target.value); }} />
            </label>
          </div>
          <div>
            <label className={styles.signin__inputBlock} htmlFor="useremail">
              E-mail
              <input type="text" required autoComplete="off" value={email} onChange={(event) => { setEmail(event.target.value); }} />
            </label>
          </div>
          <div>
            <label className={styles.signin__inputBlock} htmlFor="userpassword">
              Password
              <input type="text" required autoComplete="off" value={password} onChange={(event) => { setPass(event.target.value); }} />
            </label>
          </div>
          <div className={styles.signin__buttons}>
            <button type="submit" className={styles.btn}>
              Sign up!
            </button>
          </div>
        </form>
        <p>{errorMsg}</p>
      </section>
    ) : (
      <div className={styles.wrapper_msg}>
        <p>Registration completed</p>
        <p>
          you can
          {' '}
          <a href="/signin" className={styles.confirm_btn}>login</a>
          {' '}
          to the app!
        </p>
      </div>
    )
  );
}
