import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import veryfyUserData from '../../tools/verifier';
import styles from './Auth.module.css';

export default function Signup(props: { switchForm: (arg0: boolean) => void}) {
  const [username, setName] = useState('');
  const [usermail, setMail] = useState('');
  const [userpassw, setPass] = useState('');
  const [userMsg, setMsg] = useState('');
  const [loginStat, setLoginStat] = useState(false);
  const navigate = useNavigate();

  function handleSwitch (event: React.MouseEvent) {
    event.preventDefault();
    props.switchForm(true);
  }

  function handleSubmit (event: React.FormEvent) {
    event.preventDefault();
    setName('');
    setMail('');
    setPass('');
    const userDataCheck = veryfyUserData(userpassw, username, usermail);
    const doesUserExist = !!localStorage.getItem(`foodSearcher-${usermail}-mail`);
    if (doesUserExist) {
      setMsg('Such user already exist.');
    }
    else if (!userDataCheck) {
      setMsg('Please check your input data.');
    }
    else if (userDataCheck && !doesUserExist) {
      localStorage.setItem(`foodSearcher-${usermail}-mail`, usermail);
      localStorage.setItem(`foodSearcher-${usermail}-name`, username);
      localStorage.setItem(`foodSearcher-${usermail}-pass`, userpassw);
      setLoginStat(true);
      localStorage.setItem('userName', username); // в след. итерации будет изменено на store
    }
  }
  function handleLogin() {
    navigate('/');
  }

  return (
    <>
      {!loginStat ?
      (
        <section>
          <h2>Регистрация</h2>
          <form className={styles.signup} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Name</label>
              <input type="text" required id="username" autoComplete="off" value={username} onChange={(event)=>{setName(event.target.value);}} />
            </div>
            <div>
              <label htmlFor="useremail">E-mail</label>
              <input type="text" required autoComplete="off" value={usermail} onChange={(event)=>{setMail(event.target.value);}} />
            </div>
            <div>
              <label htmlFor="userpassword">Password</label>
              <input type="text" required autoComplete="off" value={userpassw} onChange={(event)=>{setPass(event.target.value);}}  />
            </div>
            <div>
              <a type="button" onClick={handleSwitch}>
                Войти
              </a>
              <button type="submit" className={styles.btn}>
              Зарегистрироваться
              </button>
            </div>
          </form>
          <p>{userMsg}</p>
        </section>) : (
        <div className={styles.wrapper_msg}>
          <p>Вы зарегистрированы.</p>
          <p>Можете войти в приложение.</p>
          <p>
            <a href="/" onClick={handleLogin} className={styles.confirm_btn}>
              Войти
            </a>
          </p>
        </div>
      )
    }
    </>
  );
}