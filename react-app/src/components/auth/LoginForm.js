import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Link } from "react-router-dom"
import './LoginForm.css'
import { getAllDmServers } from '../../store/dmserver';
import { getAllRegularServers } from '../../store/regularserver';

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
      const formatedErrors=data.map(err=> {
        const [_field, message]= err.split(":")
        return message.slice(1)
      })
      setErrors(formatedErrors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUserLogin = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'))
  }
  if (user) {
    (async()=> {
      await dispatch(getAllRegularServers());
      await dispatch(getAllDmServers());
    })();

    return <Redirect to='/channels/@me' />;
  }

  return (

    <div id="login-container">


      <div id="login-box">
        <div id="inner-container">


          <div id="welcome" className='flx-col-justify-algn-ctr'>Welcome back!</div>
          <div id="under-welcome" className='flx-col-justify-algn-ctr'>We're so excited to see you again!</div>
          <form onSubmit={onLogin} className='flx-col'>
            <div id="error-messages">
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
                className='login-input'
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
                className='login-input'
                //placeholder='Password'
                value={password}
                onChange={updatePassword}
                required
              />
              <button type='submit' id="login-button">Log In</button>
              <button type='submit' id="demo-user" onClick={demoUserLogin}>Log In As Demo User</button>
              <div id="signup-meessage">
                <div id="need-account">Need an account?</div>
                <Link to={"/sign-up"} id="linktosignup">Register</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
