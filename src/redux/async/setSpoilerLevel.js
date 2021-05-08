import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const setSpoilerLevel = (seriesId, bookId) => {
  return async (dispatch) => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      const data = {
        seriesId, 
        bookId
      }

      const headers = {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      console.log('Fetching: setSpoilerLevel');

      const response = await fetch(`https://api.no-spoilers.net/level`, {
        method: "POST",
        body: JSON.stringify(data),
        headers
      });

      dispatch({type: actionTypes.FETCHING, isFetching: false});

      if (response.status === 200) {
        const responseBody = await response.json();

        const newLevel = { [`${responseBody.seriesId}`]: responseBody.bookId }
        dispatch(actionCreators.updateUserLevels(newLevel));

        return { success: true };

      } else if (response.error) {
        console.error('Unexpected reponse error in setSpoilerLevel:', response.error);
        return { error: response.error };
      } else {
        console.error('Unexpected reponse in setSpoilerLevel:', response);
        return { error: response };
      }

    } catch(err) {
      console.error('Error in setSpoilerLevel:', err);
      dispatch({type: actionTypes.FETCHING, isFetching: false});
      return { error: err };
    }
  }
}

export default setSpoilerLevel;