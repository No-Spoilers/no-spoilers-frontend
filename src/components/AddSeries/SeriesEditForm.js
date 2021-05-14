import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { reduxConnect } from '../../redux/tools';
import './SeriesEditForm.css';

const SeriesEditForm = (props) => {
  const history = useHistory();
  const { thisSeries } = props;

  const [state,setState] = useState({
    name: thisSeries?.name || '',
    description: thisSeries?.text || '',
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

      const seriesData = {
        name: state.name,
        text: state.description
      }
      
      let result;
      if (thisSeries?.seriesId) {
        seriesData.seriesId = thisSeries.seriesId;
        result = await props.updateSeries(seriesData);
      } else {
        result = await props.postNewsSeries(seriesData);
      }

      if (result.error) {
        console.error(result);
        setState({
          ...state, 
          submitFail: result.error,
          fieldsDisabled: false,
          submitting: false
        })
      } else {
        setState({
          ...state, 
          fieldsDisabled: false,
          submitting: false
        });

        if (result.series) {
          history.push(`/${result.series.seriesId}`);
        } else if (props.cancel) {
          props.cancel();
        }
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
    
    props.cancel?.();
  }

  return (
    <form className="series-edit-form" onSubmit={submitButtonHandler}>
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

      {state.submitting ? <div className="submit-fail">SENDING DATA</div> : null}
      {state.submitFail ? <div className="submit-fail">Error: {state.submitFail}</div> : null}
    </form>
  )
}

export default reduxConnect(SeriesEditForm);