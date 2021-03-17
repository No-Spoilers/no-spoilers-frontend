import React, { Component } from 'react';
import './AddSeries.css';

export default class AddSeries extends Component {
  state = {
    name: '',
    description: '',
    fieldsDisabled: false,
    nameFieldClass: '',
    descriptionFieldClass: '',
    submitting: false,
    submitFail: null
  }
  
  validateForm = () => {
    return this.state.name.length > 0;
  }

  validateName = () => {
    this.setState({nameFieldClass:'buttonValidate'})
  }

  validateDescription = () => {
    this.setState({descriptionFieldClass:'buttonValidate'})
  }
  
  submitButtonHandler = async (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      this.setState({
        fieldsDisabled: true,
        submitting: true
      });
      
      try {
        const data = {
          "name": this.state.name,
          "description": this.state.description
        }

        const headers = {
          "Content-type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        };
    
        const result = await fetch('https://api.no-spoilers.net/series', {
          method: "POST",
          body: JSON.stringify(data),
          headers
        })

        const responseBody = await result.json();

        if (result.status !== 201) {
          console.error('error:', result);
          this.setState({
            submitFail: responseBody.error,
            fieldsDisabled: false,
            submitting: false
          })
        } else {
          // Store data
          this.setState({
            fieldsDisabled: false,
            submitting: false
          });
          this.props.navHandler('browse');
        }
      } catch (err) {
        console.error('err:', err);
        this.setState({
          fieldsDisabled: false,
          submitting: false
        })
      }
    }
  }

  cancelButtonHandler = () => {
    this.setState({
      fieldsDisabled: false,
      name: '',
      description: '',
      nameFieldClass: '',
      descriptionFieldClass: ''
    });
    
    this.props.navHandler('browse');
  }

  render() {
    return (
        <div className="login-container">
          
          <div className="login-login-tab">Add New Series</div>  
          
          <form className="form-box" onSubmit={this.submitButtonHandler}>
            <label htmlFor="name"><b>Series Name</b></label>
            <input 
              name="name" 
              type="text" 
              placeholder="Enter Series Name" 
              autoComplete="off"
              className={this.state.nameFieldClass}
              onBlur={this.validateName}
              value={this.state.name}
              onChange={(e) => this.setState({name:e.target.value})}
              disabled={this.state.fieldsDisabled}
              required 
              autoFocus 
            />
    
            <label htmlFor="description"><b>Brief Description</b></label>
            <textarea  
              name="description" 
              type="text" 
              placeholder="Enter Description" 
              className={this.state.descriptionFieldClass}
              onBlur={this.validateDescription}
              value={this.state.description}
              onChange={(e) => this.setState({description:e.target.value})}
              disabled={this.state.fieldsDisabled}
              required 
            />

            <button 
              type="submit"
              onClick={this.submitButtonHandler} 
              className="login-button"
              disabled={!this.validateForm()}
            >Submit</button>
            
            <button 
              type="reset"
              onClick={this.cancelButtonHandler} 
              className="cancel-button"
            >Cancel</button>

            {this.state.submitting ? <div className="login-fail">SENDING DATA</div> : null}
            {this.state.submitFail ? <div className="login-fail">Error: {this.state.submitFail}</div> : null}
          </form>
  
  
        </div>
  
    )
  }
}
