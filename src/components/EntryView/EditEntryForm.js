import { useState } from "react";
import { useParams } from "react-router";
import { reduxConnect } from "../../redux/tools"
import SpoilerLevelDropDown from "./SpoilerLevelDropDown";
import './EditEntryForm.css';

const EditEntryForm = (props) => {
  const entryId = useParams().contentId;
  
  const { seriesDetails, updateEntry } = props;
  const seriesId = props.lookUp[entryId];
  const entry = seriesDetails?.[seriesId]?.entries?.[entryId] || {};
  const entryName = entry.name;
  const spolierLevelBookId = props.userSpoilerLevel[seriesId] || '';

  const [state,setState] = useState({
    text: entry?.text?.[spolierLevelBookId],
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
      
      const entryData = {
        seriesId,
        bookId: spolierLevelBookId,
        entryId,
        text: state.text
      }

      console.log('entryData:', entryData);

      const result = await updateEntry(entryData);

      if (result?.success) {
        setState({
          ...state,
          text: '',
          fieldsDisabled: false,
          submitting: false
        });

        props.cancel(); // close form
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
  // Article Text
  return (
    <div className="entry-edit-form-container">
      <form className="entry-edit-form" onSubmit={submitButtonHandler}>
        <h1>{entryName}</h1>

        <label htmlFor="spolierLevelBook">Entry for book: <SpoilerLevelDropDown /></label>
        
        <textarea  
          type="text"
          name="article"
          className="add-entry-text"
          value={state.text}
          onChange={(e) => setState({...state, text:e.target.value})}
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

export default reduxConnect(EditEntryForm);