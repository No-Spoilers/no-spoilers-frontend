import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const postNewEntry = (entryData) => {
  return async (dispatch) => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      const postBody = {
        seriesId: entryData.seriesId,
        bookId: entryData.bookId,
        name: entryData.name,
      }
      
      if (entryData.text) {
        postBody.text = entryData.text;
      }

      const headers = {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      console.log('Fetching: postNewEntry');
      
      const response = await fetch('https://api.no-spoilers.net/entry', {
        method: "POST",
        body: JSON.stringify(postBody),
        headers
      });

      console.log('Fetching: postNewEntry complete');
      dispatch({type: actionTypes.FETCHING, isFetching: false});
     
      if (response.status === 201) {
        const responseBody = await response.json();
        dispatch(actionCreators.updateEntries(responseBody));
        return { success: true };
      } else if (response.error) {
        console.error(response.error);
        return { error: response.error };
      }

      console.error('Unexpected result from server');
      return { error: 'Unexpected result from server' };

    } catch(err) {
      console.error('Error in postNewEntry:', err);
      dispatch({type: actionTypes.FETCHING, isFetching: false});
      return { error: err };
    }
  }
}

export default postNewEntry;