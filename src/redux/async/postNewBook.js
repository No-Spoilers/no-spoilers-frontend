import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const postNewBook = (bookData) => {
  return async (dispatch) => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      const data = {
        seriesId: bookData.seriesId,
        name: bookData.name,
        pubDate: bookData.pubDate,
        text: bookData.text
      }

      const headers = {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      console.debug('Fetching: postNewBook');

      const response = await fetch('https://api.no-spoilers.net/book', {
        method: "POST",
        body: JSON.stringify(data),
        headers
      });
     
      if (response.status === 201) {
        const responseBody = await response.json();

        dispatch(actionCreators.postNewBookSuccess(responseBody));
        dispatch({type: actionTypes.FETCHING, isFetching: false});
        return { success: true };
      }
  
      if (response.error) {
        console.error(response.error);
        dispatch({type: actionTypes.FETCHING, isFetching: false});
        return { error: response.error };
      }

    } catch(err) {
      console.error('Error in postNewBook:', err);
      dispatch({type: actionTypes.FETCHING, isFetching: false});
      return { error: err };
    }
  }
}

export default postNewBook;