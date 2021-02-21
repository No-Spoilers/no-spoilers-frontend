import React, { Component } from 'react';
import './SignupPage.css';

export default class SignupPage extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    fieldsDisabled: false,
    emailFieldClass: '',
    nameFieldClass: '',
    passwordFieldClass: '',
    loginFail: null
  }
  
  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.name.length > 0;
  }

  validateEmail = () => {
    this.setState({emailFieldClass:'buttonValidate'})
  }

  validateName = () => {
    this.setState({nameFieldClass:'buttonValidate'})
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
          "name": this.state.name,
          "password": this.state.password
        }
    
        const result = await fetch('https://api.no-spoilers.net/user', {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {"Content-type": "application/json;charset=UTF-8"}
        })

        const responseBody = await result.json();

        if (result.status !== 201) {
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
      confirmPassword: '',
      emailFieldClass: '',
      passwordFieldClass: ''
    });
    
    this.props.navHandler('browse');
  }

  render() {
    return (
      <div className="signup-container">
        <div className="tab-container">
          <div className="signup-login-tab" onClick={() => this.props.navHandler('login')}>Login</div>
          <div className="signup-signup-tab">Signup</div>
        </div>
        <form className="signup-form-box" onSubmit={this.loginButtonHandler}>
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
          
          <label htmlFor="name"><b>Display Name</b></label>
          <input 
            name="name" 
            type="text"
            placeholder="Enter name" 
            className={this.state.nameFieldClass}
            onBlur={this.validateName}
            value={this.state.name}
            onChange={(e) => this.setState({name:e.target.value})}
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
  
          <label htmlFor="conf-psw"><b>Confirm Password</b></label>
          <input 
            name="conf-psw" 
            type="password" 
            placeholder="Confirm Password" 
            className={this.state.passwordFieldClass}
            onBlur={this.validatePassword}
            value={this.state.confirmPassword}
            onChange={(e) => this.setState({confirmPassword:e.target.value})}
            disabled={this.state.fieldsDisabled}
            required 
          />

          <button 
            type="submit"
            onClick={this.loginButtonHandler} 
            className="login-button"
            disabled={!this.validateForm()}
          >Sign Up</button>
          
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
