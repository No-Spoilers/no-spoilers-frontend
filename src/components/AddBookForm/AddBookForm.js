import React, { useState } from 'react';
import { reduxConnect } from '../../redux/tools';
import './AddBookForm.css';

const AddBookForm = (props) => {
  const [state,setState] = useState({
    title: '',
    pubDate: '',
    description: '',
    fieldsDisabled: false,
    submitting: false,
    submitFail: null
  });

  const { postNewBook } = props;
  
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
      if (!props.seriesId || state.title.length < 1 || state.pubDate.length < 1) {
        throw new Error('Invalid data. Please fill all required fields.');
      }
      
      const bookData = {
        seriesId: props.seriesId,
        name: state.title,
        pubDate: state.pubDate
      }

      const result = await postNewBook(bookData);
     
      if (result.success) {
        setState({
          ...state,
          title: '',
          pubDate: '',
          description: '',
          fieldsDisabled: false,
          submitting: false
        });
        document.getElementById('first-input').focus();
      } else {
        console.error(result.error);
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
            id="first-input"
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
            onChange={(e) => setState({...state, pubDate:e.target.value})}
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
            className="submit-button"
          >Submit</button>
          
          <button 
            type="reset"
            onClick={cancelButtonHandler} 
            className="cancel-button"
          >Cancel</button>

          {state.submitting ? <div className="submitting-data">SENDING DATA</div> : null}
          {state.submitFail ? <div className="submit-fail">{state.submitFail}</div> : null}
        </form>
      </div>
  )
}

export default reduxConnect(AddBookForm);