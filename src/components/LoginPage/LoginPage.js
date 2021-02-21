import React, { Component } from 'react';
import './LoginPage.css';

export default class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    fieldsDisabled: false,
    emailFieldClass: '',
    passwordFieldClass: '',
    loginFail: null
  }
  
  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  validateEmail = () => {
    this.setState({emailFieldClass:'buttonValidate'})
  }

  validatePassword = () => {
    this.setState({passwordFieldClass:'buttonValidate'})
  }
  
  loginButtonHandler = async (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      this.setState({fieldsDisabled: true});
      
      try {
        const credentials = {
          "email": this.state.email,
          "password": this.state.password
        }
    
        const result = await fetch('https://api.no-spoilers.net/login', {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {"Content-type": "application/json;charset=UTF-8"}
        })

        const responseBody = await result.json();

        if (result.status !== 200) {
          this.setState({
            loginFail: responseBody.error,
            fieldsDisabled: false
          })
        } else {
          // Store user data in localStorage
          Object.keys(responseBody).forEach(key => localStorage.setItem(key, responseBody[key]));
    
          this.props.setUser(responseBody);
          this.props.navHandler('account');
        }
      } catch (err) {
        console.error('err:', err);
        this.setState({
          fieldsDisabled: false
        })
      }
    }
  }

  cancelButtonHandler = () => {
    this.setState({
      fieldsDisabled: false,
      email: '',
      password: '',
      emailFieldClass: '',
      passwordFieldClass: ''
    });
    
    this.props.navHandler('browse');
  }

  render() {
    return (
        <div className="login-container">
          <div className="tab-container">
            <div className="login-login-tab">Login</div>
            <div className="login-signup-tab" onClick={() => this.props.navHandler('signup')}>Signup</div>
          </div>
          <form className="form-box" onSubmit={this.loginButtonHandler}>
            <label htmlFor="email"><b>Email</b></label>
            <input 
              name="email" 
              type="email" 
              placeholder="Enter Email" 
              className={this.state.emailFieldClass}
              onBlur={this.validateEmail}
              value={this.state.email}
              onChange={(e) => this.setState({email:e.target.value})}
              disabled={this.state.fieldsDisabled}
              required 
              autoFocus 
            />
    
            <label htmlFor="psw"><b>Password</b></label>
            <input 
              name="psw" 
              type="password" 
              placeholder="Enter Password" 
              className={this.state.passwordFieldClass}
              onBlur={this.validatePassword}
              value={this.state.password}
              onChange={(e) => this.setState({password:e.target.value})}
              disabled={this.state.fieldsDisabled}
              required 
            />

            <button 
              type="submit"
              onClick={this.loginButtonHandler} 
              className="login-button"
              disabled={!this.validateForm()}
            >Login</button>
            
            <button 
              type="reset"
              onClick={this.cancelButtonHandler} 
              className="cancel-button"
            >Cancel</button>

            {this.state.loginFail ? <div className="login-fail">Error: {this.state.loginFail}</div> : null}
          </form>
  
  
        </div>
  
    )
  }
}
