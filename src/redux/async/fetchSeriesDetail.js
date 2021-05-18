import actionCreators from "../actionCreators";
import actionTypes from "../actionTypes";

const fetchSeriesDetail = (seriesId) => {
  return async (dispatch) => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      console.log('Fetching: fetchSeriesDetail');
      const response = await fetch(`https://api.no-spoilers.net/series/${seriesId}`);
      const body = await response.json();

      console.log('Fetching: fetchSeriesDetail complete');
  
      if (body.error) {
        console.error(body.error);
        dispatch({type: actionTypes.FETCHING, isFetching: false});
        return;
      }

      dispatch(actionCreators.updateSeriesEntries(body));
      dispatch({type: actionTypes.FETCHING, isFetching: false});

    } catch(err) {
      console.log('Error in fetchSeriesDetail:', err);
      dispatch({type: actionTypes.FETCHING, isFetching: false});
    }
  }
}

export default fetchSeriesDetail;