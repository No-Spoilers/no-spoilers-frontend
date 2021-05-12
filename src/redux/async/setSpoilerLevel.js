import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const setSpoilerLevel = (seriesId, bookId) => {
  return async (dispatch) => {
    try {
      const newLevel = { [`${seriesId}`]: bookId }
      dispatch(actionCreators.updateUserLevels(newLevel));

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

      console.log('Fetching complete: setSpoilerLevel');
      dispatch({type: actionTypes.FETCHING, isFetching: false});

      if (response.status === 200) {

        return { success: true };

      } else if (response.error) {
        
      // TODO: Improve user alert for network errors. Their state might not be saved.

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