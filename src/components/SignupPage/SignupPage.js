import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { reduxConnect } from '../../redux/tools';
import './SignupPage.css';

const SignupPage = (props) => {
  const history = useHistory();

  const [state, setState] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    fieldsDisabled: false,
    emailFieldClass: '',
    nameFieldClass: '',
    passwordFieldClass: '',
    loginFail: null
  });
  
  const validateForm = () => {
    return state.email.length > 0 && state.password.length > 0 && state.name.length > 0;
  }

  const validateEmail = () => {
    setState({...state, emailFieldClass:'buttonValidate'})
  }

  const validateName = () => {
    setState({...state, nameFieldClass:'buttonValidate'})
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
          "name": state.name,
          "password": state.password
        }

        const fetchSettings = {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {"Content-type": "application/json;charset=UTF-8"}
        }
    
        const result = await fetch('https://api.no-spoilers.net/user', fetchSettings)
        const responseBody = await result.json();

        if (result.status !== 201) {
          setState({
            ...state, 
            loginFail: responseBody,
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
      confirmPassword: '',
      emailFieldClass: '',
      passwordFieldClass: ''
    });
    
    history.push('/browse');
  }

  return (
    <div className="signup-container">
      <div className="tab-container">
        <div className="signup-login-tab" onClick={() => history.push('/login')}>Login</div>
        <div className="signup-signup-tab">Signup</div>
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
        
        <label htmlFor="name"><b>Display Name</b></label>
        <input 
          name="name" 
          type="text"
          placeholder="Enter name" 
          className={state.nameFieldClass}
          onBlur={validateName}
          value={state.name}
          onChange={(e) => setState({...state, name:e.target.value})}
          disabled={state.fieldsDisabled}
          required  
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

        <label htmlFor="conf-psw"><b>Confirm Password</b></label>
        <input 
          name="conf-psw" 
          type="password" 
          placeholder="Confirm Password" 
          className={state.passwordFieldClass}
          onBlur={validatePassword}
          value={state.confirmPassword}
          onChange={(e) => setState({...state, confirmPassword:e.target.value})}
          disabled={state.fieldsDisabled}
          required 
        />

        <button 
          type="submit"
          onClick={loginButtonHandler} 
          className="login-button"
          disabled={!validateForm()}
        >Sign Up</button>
        
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

export default reduxConnect(SignupPage);