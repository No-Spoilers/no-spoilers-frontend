import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './AddSeries.css';

const AddSeries = (props) => {
  const history = useHistory();

  const [state,setState] = useState({
    name: '',
    description: '',
    fieldsDisabled: false,
    nameFieldClass: '',
    descriptionFieldClass: '',
    submitting: false,
    submitFail: null
  });
  
  const validateForm = () => {
    return state.name.length > 0;
  }

  const validateName = () => {
    setState({...state, nameFieldClass:'buttonValidate'})
  }

  const validateDescription = () => {
    setState({...state, descriptionFieldClass:'buttonValidate'})
  }
  
  const submitButtonHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setState({
        ...state, 
        fieldsDisabled: true,
        submitting: true
      });
      
      try {
        const data = {
          name: state.name,
          description: state.description
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
          setState({
            ...state, 
            submitFail: responseBody.error,
            fieldsDisabled: false,
            submitting: false
          })
        } else {
          // Store data
          setState({
            ...state, 
            fieldsDisabled: false,
            submitting: false
          });
          history.push('/browse');
        }
      } catch (err) {
        console.error('err:', err);
        setState({
          ...state, 
          fieldsDisabled: false,
          submitting: false
        })
      }
    }
  }

  const cancelButtonHandler = () => {
    setState({
      ...state, 
      fieldsDisabled: false,
      name: '',
      description: '',
      nameFieldClass: '',
      descriptionFieldClass: ''
    });
    
    history.push('/browse');
  }

  return (
    <div className="add-series-container">
      
      <h1 className="add-series-title">Add New Series</h1>
      
      <form className="form-box" onSubmit={submitButtonHandler}>
        <label htmlFor="name"><b>Series Name</b></label>
        <input 
          name="name" 
          type="text" 
          placeholder="Enter Series Name" 
          autoComplete="off"
          className={state.nameFieldClass}
          onBlur={validateName}
          value={state.name}
          onChange={(e) => setState({...state, name:e.target.value})}
          disabled={state.fieldsDisabled}
          required 
          autoFocus 
        />

        <label htmlFor="description"><b>Brief Description</b></label>
        <textarea  
          name="description" 
          type="text" 
          placeholder="Enter Description" 
          className={state.descriptionFieldClass}
          onBlur={validateDescription}
          value={state.description}
          onChange={(e) => setState({...state, description:e.target.value})}
          disabled={state.fieldsDisabled}
          required 
        />

        <button 
          type="submit"
          onClick={submitButtonHandler} 
          className="submit-button"
          disabled={!validateForm()}
        >Submit</button>
        
        <button 
          type="reset"
          onClick={cancelButtonHandler} 
          className="cancel-button"
        >Cancel</button>

        {state.submitting ? <div className="login-fail">SENDING DATA</div> : null}
        {state.submitFail ? <div className="login-fail">Error: {state.submitFail}</div> : null}
      </form>
    </div>
  )
}

export default AddSeries;