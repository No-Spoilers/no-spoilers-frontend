import React, { useState } from 'react';
import { useParams } from 'react-router';
import { reduxConnect } from '../../redux/tools';
import './AddMentionForm.css';

const AddMentionForm = (props) => {
  const bookId = useParams().contentId;
  const seriesId = props.lookUp[bookId];

  const [state,setState] = useState({
    mention: '',
    fieldsDisabled: false,
    submitting: false,
    submitFail: null
  });
  
  const validateForm = () => {
    return state.mention.length > 0;
  }

  const submitButtonHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setState({
        ...state, 
        fieldsDisabled: true,
        submitting: true
      });

      const mentionData = {
        name: state.mention,
        seriesId,
        bookId,
      }

      const result = await props.postNewEntry(mentionData);

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
          mention: '',
          fieldsDisabled: false,
          submitting: false
        });
        document.getElementById('mention-input').focus();
      }
    }
  }

  const cancelButtonHandler = () => {
    setState({
      ...state, 
      fieldsDisabled: false,
      name: ''
    });
    
    props.cancel?.();
  }

  return (
    <form className="add-mention-form" onSubmit={submitButtonHandler}>
      <label htmlFor="mention"><b>Add Mention</b></label>
      <input
        id="mention-input"
        name="mention" 
        type="text" 
        placeholder="Enter Mention Here" 
        className=""
        value={state.mention}
        autoComplete="off"
        onChange={(e) => setState({...state, mention:e.target.value})}
        disabled={state.fieldsDisabled}
        required 
        autoFocus 
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

export default reduxConnect(AddMentionForm);