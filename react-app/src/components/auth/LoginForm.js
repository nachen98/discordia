import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUserLogin=(e)=>{
    e.preventDefault();
    const demoUser = { email: 'demo@aa.io', password:'password'}
    dispatch(login(demoUser))
  }
  if (user) {
    return <Redirect to='/' />;
  }

  return (
  
    <div id="login-container">

    
    <div id="login-box">
      <div id="inner-container">

      
      <div id="welcome" className='flx-col-justify-algn-ctr'>Welcome back!</div>
      <div id="under-welcome" className='flx-col-justify-algn-ctr'>We're so excited to see you again!</div>
      <form onSubmit={onLogin} className='flx-col'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div >
        <label htmlFor='email'>EMAIL
        <span id="required-field">*</span>
        </label>
        <input
          name='email'
          type='text'
          //placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
        />
      </div>
      <div>
        <label htmlFor='password'>PASSWORD
        <span id="required-field">*</span>
        </label>
        <input
          name='password'
          type='password'
          //placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
        />
        <button type='submit' id="login-button">Log In</button>
        <button type='submit' id="demo-user" onClick={demoUserLogin}>Log In As Demo User</button>
      </div>
    </form>
    </div>
    </div>
    </div>
  );
};

export default LoginForm;
