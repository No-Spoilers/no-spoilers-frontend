import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const postNewSeries = (seriesData) => {
  return async (dispatch) => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      const headers = {
        "Content-type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };
  
      const result = await fetch('https://api.no-spoilers.net/series', {
        method: 'POST',
        body: JSON.stringify(seriesData),
        headers
      })

      const responseBody = await result.json();

      dispatch({type: actionTypes.FETCHING, isFetching: false});
      
      if (result.status === 201) {
        dispatch(actionCreators.updateSeriesDetails(responseBody.series));
        return { success: true };
      }
      
      return {
        error: 'Unexpected response',
        result
      };

    } catch (err) {
      dispatch({type: actionTypes.FETCHING, isFetching: false});
      return {
        error: 'Unexpected response',
        result: err
      }
    }
  }
}

export default postNewSeries;