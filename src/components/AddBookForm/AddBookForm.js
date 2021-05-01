import React, { useState } from 'react';
import './AddBookForm.css';

const AddBookForm = (props) => {
  const [state,setState] = useState({
    title: '',
    publicationDate: '',
    description: '',
    fieldsDisabled: false,
    submitting: false,
    submitFail: null
  });
  
  const submitButtonHandler = async (e) => {
    e.preventDefault();

    try {
      setState({
        ...state, 
        fieldsDisabled: true,
        submitting: true,
        submitFail: null
      });

      //validate
      if (!props.seriesId || state.title.length < 1 || state.publicationDate.length < 1) {
        throw new Error('Invalid data. Please fill all required fields.');
      }
      
      const data = {
        // TODO
        seriesId: props.seriesId,
        name: state.title,
        pubDate: state.publicationDate
      }

      const headers = {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      console.log('headers:', headers);
      console.log('data:', data);
  
      const result = await fetch('https://api.no-spoilers.net/book', {
        method: "POST",
        body: JSON.stringify(data),
        headers
      });

      const responseBody = await result.json();

      if (result.status === 201) {
        setState({
          ...state,
          title: '',
          description: '',
          fieldsDisabled: false,
          submitting: false
        });

        // TODO: Send new data directly to redux

      } else {
        console.error(responseBody);
        throw new Error('Unexpected response from server')
      }
    } catch (err) {
      console.error('err:', err);
      setState({
        ...state,
        submitFail: `${err}`,
        fieldsDisabled: false,
        submitting: false
      })
    }
  
  }

  const cancelButtonHandler = () => {
    props.cancel();
  }

  return (
      <div className="add-book-container">
        
        <form className="form-box" onSubmit={submitButtonHandler}>
          <label htmlFor="title"><b>Add Book Title</b></label>
          <input 
            type="text"
            name="title"
            placeholder="Enter Book Name"
            autoComplete="off"
            className="add-book-title"
            value={state.title}
            onChange={(e) => setState({...state, title:e.target.value})}
            disabled={state.fieldsDisabled}
            required
            autoFocus
          />
  
          <label htmlFor="publicationDate"><b>Publication Date</b></label>
          <input
            type="date"
            name="publicationDate"
            className="add-book-description"
            value={state.pubDate}
            onChange={(e) => setState({...state, publicationDate:e.target.value})}
            disabled={state.fieldsDisabled}
            required
          />
  
          <label htmlFor="description"><b>Brief Description (optional)</b></label>
          <textarea  
            type="text"
            name="description"
            placeholder="Enter Description"
            className="add-book-description"
            value={state.description}
            onChange={(e) => setState({...state, description:e.target.value})}
            disabled={state.fieldsDisabled}
          />

          <button 
            type="submit"
            onClick={submitButtonHandler} 
            className="login-button"
          >Submit</button>
          
          <button 
            type="reset"
            onClick={cancelButtonHandler} 
            className="cancel-button"
          >Cancel</button>

          {state.submitting ? <div className="login-fail">SENDING DATA</div> : null}
          {state.submitFail ? <div className="login-fail">{state.submitFail}</div> : null}
        </form>


      </div>

  )
}

export default AddBookForm;