import React, { Component } from 'react';
import './LoginPage.css';
import cookies from '../../lib/cookies';

export default class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    fieldsDisabled: false,
    emailFieldClass: '',
    passwordFieldClass: ''
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
  
  loginButtonHandler = async () => {
    if (this.validateForm()) {
      this.setState({fieldsDisabled: true});
    }

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
      .then(response => response.json()) 

      cookies.set(result);

      this.props.setUser(result)
    } catch (err) {
      console.error('err:', err);
    }
  }

  cancelButtonHandler = () => {
    this.setState({
      fieldsDisabled: false,
      email: '',
      password: '',
      emailFieldClass: '',
      passwordFieldClass: ''
    })
  }

  render() {

    return (
      <div>
        <div className="container">
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
            onClick={this.loginButtonHandler} 
            className="login-button"
            disabled={!this.validateForm()}
          >Login</button>
          
          <button 
            onClick={this.cancelButtonHandler} 
            className="cancel-button"
          >Cancel</button>
  
        </div>
  
      </div>
    )
  }
}
