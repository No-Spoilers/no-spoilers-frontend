import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const fetchUserLevels = () => {
  return async (dispatch) => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      console.info('Fetching: fetchUserLevels');

      const headers = {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      const response = await fetch('https://api.no-spoilers.net/level',{
        method: 'GET',
        headers
      });

      const responseBody = await response.json();

      dispatch({type: actionTypes.FETCHING, isFetching: false});

      if (responseBody && typeof responseBody === 'object') {
        dispatch(actionCreators.updateUserLevels(responseBody))
      } else {
        console.error('Unexpected error fetching user levels', response);
        console.error('responseBody:', responseBody);
      }
    } catch(err) {
      console.error('Unexpected error in fetchUserLevels');
      console.log(err);
      dispatch({type: actionTypes.FETCHING, isFetching: false});
    }
  }
}

export default fetchUserLevels;