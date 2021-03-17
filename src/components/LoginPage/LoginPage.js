import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = (props) => {
  const history = useHistory();

  const [state, setState] = useState({
    email: '',
    password: '',
    fieldsDisabled: false,
    emailFieldClass: '',
    passwordFieldClass: '',
    loginFail: null
  })
  
  const validateForm = () => {
    return state.email.length > 0 && state.password.length > 0;
  }

  const validateEmail = () => {
    setState({...state, emailFieldClass:'buttonValidate'})
  }

  const validatePassword = () => {
    setState({...state, passwordFieldClass:'buttonValidate'})
  }
  
  const loginButtonHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setState({...state, fieldsDisabled: true});
      
      try {
        const credentials = {
          "email": state.email,
          "password": state.password
        }
    
        const result = await fetch('https://api.no-spoilers.net/login', {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {"Content-type": "application/json;charset=UTF-8"}
        })

        const responseBody = await result.json();

        if (result.status !== 200) {
          setState({
            ...state, 
            loginFail: responseBody.error,
            fieldsDisabled: false
          })
        } else {
          // Store user data in localStorage
          Object.keys(responseBody).forEach(key => localStorage.setItem(key, responseBody[key]));
    
          props.setUser(responseBody);
          history.push('/account');
        }
      } catch (err) {
        console.error('err:', err);
        setState({
          ...state, 
          fieldsDisabled: false
        })
      }
    }
  }

  const cancelButtonHandler = () => {
    setState({
      ...state, 
      fieldsDisabled: false,
      email: '',
      password: '',
      emailFieldClass: '',
      passwordFieldClass: ''
    });
    
    props.navHandler('browse');
  }


  return (
      <div className="login-container">
        <div className="tab-container">
          <div className="login-login-tab">Login</div>
          <div className="login-signup-tab">
            <Link to='/signup'>Signup</Link>
          </div>
        </div>
        <form className="form-box" onSubmit={loginButtonHandler}>
          <label htmlFor="email"><b>Email</b></label>
          <input 
            name="email" 
            type="email" 
            placeholder="Enter Email" 
            className={state.emailFieldClass}
            onBlur={validateEmail}
            value={state.email}
            onChange={(e) => setState({...state, email:e.target.value})}
            disabled={state.fieldsDisabled}
            required 
            autoFocus 
          />
  
          <label htmlFor="psw"><b>Password</b></label>
          <input 
            name="psw" 
            type="password" 
            placeholder="Enter Password" 
            className={state.passwordFieldClass}
            onBlur={validatePassword}
            value={state.password}
            onChange={(e) => setState({...state, password:e.target.value})}
            disabled={state.fieldsDisabled}
            required 
          />

          <button 
            type="submit"
            onClick={loginButtonHandler} 
            className="login-button"
            disabled={!validateForm()}
          >Login</button>
          
          <button 
            type="reset"
            onClick={cancelButtonHandler} 
            className="cancel-button"
          >Cancel</button>

          {state.loginFail ? <div className="login-fail">Error: {state.loginFail}</div> : null}
        </form>


      </div>

  )
}

export default LoginPage;