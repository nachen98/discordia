import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';
import { Link } from "react-router-dom"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      return setErrors(["Password does not match."])
    }
    if(password.length < 6){
      return setErrors(["Password needs to be more than 6 characters."])
    }
    const data = await dispatch(signUp(username, email, password));
  
    if (data) {
      const formatedErrors = data.map(err => {
        const [_field, message] = err.split(":")
        return message.slice(1)
      })
      setErrors(formatedErrors)
    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="signup-container">

      <div id="signup-box">
        <div id="signup-inner-container">
          <div id="create-an-account" className='flx-col-justify-algn-ctr'>Create an account</div>
          <form onSubmit={onSignUp}>
            <div id="error-messages">
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <label>EMAIL</label>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <label>USERNAME</label>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <label>PASSWORD</label>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <label>REPEAT PASSWORD</label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type='submit' id="signup-button">Sign Up</button>
            <Link to={"/login"} id="linktologin">Already have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
