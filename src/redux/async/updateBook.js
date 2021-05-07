import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const updateBook = (bookData) => {
  return async (dispatch) => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      const data = {
        name: bookData.name,
        pubDate: bookData.pubDate,
        text: bookData.text
      }

      const headers = {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      console.log('Fetching: updateBook');

      const response = await fetch(`https://api.no-spoilers.net/book/${bookData.bookId}/series/${bookData.seriesId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers
      });

      if (response.status === 200) {
        const responseBody = await response.json();

        dispatch(actionCreators.updateBookSuccess(responseBody));
        dispatch({type: actionTypes.FETCHING, isFetching: false});
        return { success: true };
      } else if (response.error) {
        console.error('response.error:', response.error);
        dispatch({type: actionTypes.FETCHING, isFetching: false});
        return { error: response.error };
      } else {
        console.error('unexpected reponse:', response);
        const errorBody = await response.json();
        console.error('body:', errorBody);
      }

    } catch(err) {
      console.error('Error in updateBook:', err);
      dispatch({type: actionTypes.FETCHING, isFetching: false});
      return { error: err };
    }
  }
}

export default updateBook;