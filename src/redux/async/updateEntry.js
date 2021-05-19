import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const updateEntry = (entryData) => {
  return async (dispatch) => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      const postBody = {
        seriesId: entryData.seriesId,
        bookId: entryData.bookId,
        entryId: entryData.entryId
      }
      
      if (entryData.text) {
        postBody.text = entryData.text;
      }
      
      if (entryData.name) {
        postBody.name = entryData.name;
      }

      const headers = {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      console.log('Fetching: updateEntry');

      const response = await fetch('https://api.no-spoilers.net/entry', {
        method: "PATCH",
        body: JSON.stringify(postBody),
        headers
      });

      console.log('Fetching: updateEntry complete');
      dispatch({type: actionTypes.FETCHING, isFetching: false});
     
      if (response.status === 200) {
        const responseBody = await response.json();
        dispatch(actionCreators.updateEntrySuccess(responseBody));
        return { success: true };
      } else if (response.error) {
        console.error(response.error);
        return { error: response.error };
      }

      console.error('Unexpected result from server');
      return { error: 'Unexpected result from server' };

    } catch(err) {
      console.error('Error in updateEntry:', err);
      dispatch({type: actionTypes.FETCHING, isFetching: false});
      return { error: err };
    }
  }
}

export default updateEntry;