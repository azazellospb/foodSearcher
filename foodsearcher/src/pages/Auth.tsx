import React, { useState } from 'react';
import Signin from '../components/auth/Signup';
import Signup from '../components/auth/Signup';

export default function Auth() {
  const [logIn, setLogIn] = useState(true);

  const switchForms = (isClick: boolean) => setLogIn(isClick);

  return (
    <div className="auth-container container">
      {logIn ? <Signin switchForm={switchForms} /> : <Signup switchForm={switchForms} />}
    </div>
  );
}
