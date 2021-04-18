export const actionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  ADD_SERIES_LIST: 'ADD_SERIES_LIST',
  FETCHING: 'FETCHING'
}

//synchronous action creator
const fetchSeriesListSuccess = body => ({
  type: actionTypes.ADD_SERIES_LIST,
  seriesList: body
})

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchSeriesList =  () => {
  return async dispatch => {
    try {
      dispatch({type: actionTypes.FETCHING, isFetching: true});

      const response = await fetch('https://api.no-spoilers.net/series');
      const body = await response.json();

      dispatch({type: actionTypes.FETCHING, isFetching: false});

      if (body && body.length > 0) {
        dispatch(fetchSeriesListSuccess(body)) //redux first five posts
      } else {
        // todo: needs proper error handling
        dispatch({type: actionTypes.ADD_SERIES_LIST, seriesList: ['error fetching']});  
      }
    }
    catch(e){
      console.log(e);
      dispatch({type: actionTypes.FETCHING, isFetching: false});
    }
  }
}