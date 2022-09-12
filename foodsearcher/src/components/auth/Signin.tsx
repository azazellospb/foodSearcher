import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

export default function Signin (props: { switchForm: (arg0: boolean) => void}) {
  const [usermail, setMail] = useState('');
  const [userpassw, setPass] = useState('');
  const [userMsg, setMsg] = useState('');
  const navigate = useNavigate();
  
  function handleSwitch (event: React.MouseEvent) {
    event.preventDefault();
    props.switchForm(true);
  }
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMail('');
    setPass('');
    const checkPassw = localStorage.getItem(`foodSearcher-${usermail}-pass`) === userpassw;
    navigate('/');
    if (checkPassw) {
      const name = localStorage.getItem(`foodSearcher-${usermail}-name`) as string;
      setMsg('Вход выполнен успешно!');
      localStorage.setItem('userName', name); // в след. итерации будет изменено на store
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
            <label htmlFor="usermail">Email</label>
            <input 
              id="usermail" 
              onChange={(event)=> setMail(event.target.value)} 
              type="text" 
              autoComplete="off" 
              value={usermail}/>
          </div>
          <div>
            <label htmlFor="userpassw">Password</label>
            <input 
              id="userpassw" 
              onChange={(event)=> setPass(event.target.value)} 
              type="text" autoComplete="off" 
              value={userpassw} />
          </div>
        </div>
        <div>
          <a type="button" onClick={handleSwitch}>
            Зарегистрироваться
          </a>
          <button type="submit" className={styles.btn}>
            Войти
          </button>
        </div>
      </form>
      <p>{userMsg}</p>
    </section>
  );
}