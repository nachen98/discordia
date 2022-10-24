import React, { useEffect, useState } from 'react';
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

  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if(!hasSubmitted) return;

    let validationErrors = [];

    if (email.trim().length === 0) {
      validationErrors.push('Please enter an email.')
    }

    if(!email.includes('@')) {
      validationErrors.push("Please fill email in the correct format with @ sign.")
    }

    if (username.trim().length === 0) {
      validationErrors.push('Please enter a username.')
    }

    if(password.length < 6){
      validationErrors.push("Password needs to be more than 6 characters.")
    }

    if (password !== repeatPassword) {
      validationErrors.push("Password does not match.")
    }

    setErrors(validationErrors)

  }, [email, username, password, repeatPassword])

  const onSignUp = async (e) => {
    if (!hasSubmitted) setHasSubmitted(true);

    e.preventDefault();
    let validationErrors=[]

    if (email.trim().length === 0) {
      validationErrors.push('Please enter an email')
    }

    if(!email.includes('@')){
      validationErrors.push("Please fill email in the correct format with @ sign.")
    }

    if (username.trim().length === 0) {
      validationErrors.push('Please enter a username.')
    }

    if(password.length < 6){
      validationErrors.push("Password needs to be more than 6 characters.")
    }

    if (password !== repeatPassword) {
      validationErrors.push("Password does not match.")
    }

    if (validationErrors.length > 0) return setErrors(validationErrors)

    const data = await dispatch(signUp(username, email, password));
    console.log ('validation error messages ', data)
    if (data) {
      const formatedErrors = data.map(err => {
        // const [_field, message] = err.split(":")
        // return message.slice(1)
        const errMsgArr = err.split(":");
        return  errMsgArr.length >1 ? errMsgArr.slice(1) : errMsgArr
      })
      setErrors(formatedErrors)
      return
    }
    return <Redirect to='/channels/@me' />;

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
    return <Redirect to='/channels/@me' />;
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
                className='signup-input'
                type='email'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <label>USERNAME</label>
              <input
                className='signup-input'
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <label>PASSWORD</label>
              <input
                className='signup-input'
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <label>REPEAT PASSWORD</label>
              <input
                className='signup-input'
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                // required={true}
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
