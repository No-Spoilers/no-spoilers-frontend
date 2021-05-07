import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const fetchSeriesList = () => {
  return async (dispatch) => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      console.debug('Fetching: fetchSeriesList');
      const response = await fetch('https://api.no-spoilers.net/series');
      const body = await response.json();

      console.log('Series list:', body);

      dispatch({type: actionTypes.FETCHING, isFetching: false});

      if (body && body.length > 0) {
        dispatch(actionCreators.fetchSeriesListSuccess(body)) //redux first five posts
      } else {
        // TODO: needs proper error handling
        dispatch({type: actionTypes.UPDATE_SERIES_LIST, seriesList: ['error fetching']});  
      }
    } catch(e) {
      console.log(e);
      dispatch({type: actionTypes.FETCHING, isFetching: false});
    }
  }
}

export default fetchSeriesList;