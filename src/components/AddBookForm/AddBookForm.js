import React, { useState } from 'react';
import { reduxConnect } from '../../redux/tools';
import './AddBookForm.css';

const AddBookForm = (props) => {
  const { postNewBook, putBook } = props;
  const seriesId = props.seriesId || props.book?.seriesId;

  const [state,setState] = useState({
    title: props.book?.name || '',
    pubDate: props.book?.pubDate.slice(0,10) || '',
    description: props.book?.text || '',
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
      if (!seriesId || state.title.length < 1 || state.pubDate.length < 1) {
        console.log('state:', state);
        throw new Error('Invalid data. Please fill all required fields.');
      }
      
      const bookData = {
        seriesId,
        bookId: props.book?.bookId,
        name: state.title,
        pubDate: state.pubDate,
        text: state.description
      }

      let result;

      if (props.book?.name) {
        result = await putBook(bookData);
      } else {
        result = await postNewBook(bookData);
      }

     
      if (result.success) {
        setState({
          ...state,
          title: '',
          pubDate: '',
          description: '',
          fieldsDisabled: false,
          submitting: false
        });

        if (props.book?.name) {
          return props.cancel();
        }

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
        <h1>{props.book?.name ? "Edit" : "Add"} Book</h1>
          <label htmlFor="title"><b>Title</b></label>
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