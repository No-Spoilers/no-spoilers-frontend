export const actionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  ADD_SERIES_LIST: 'ADD_SERIES_LIST',
  ADD_SERIES_DETAIL: 'ADD_SERIES_DETAIL',
  FETCHING: 'FETCHING'
}

export const actionCreators = {
  logoutUser: () => ({type: actionTypes.LOGOUT_USER}),

  setUser: (user) => ({type: actionTypes.SET_USER, user}),

  setSeriesList: (seriesList) => ({type: actionTypes.ADD_SERIES_LIST, seriesList}),
  
  setFetchingStatus: (isFetching) => ({type: actionTypes.FETCHING, isFetching}),

  fetchSeriesList: () => {
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
          // todo: needs proper error handling
          dispatch({type: actionTypes.ADD_SERIES_LIST, seriesList: ['error fetching']});  
        }
      } catch(e) {
        console.log(e);
        dispatch({type: actionTypes.FETCHING, isFetching: false});
      }
    }
  },

  fetchSeriesListSuccess: (seriesList) => ({
    type: actionTypes.ADD_SERIES_LIST,
    seriesList
  }),

  fetchSeriesDetail: (seriesId) => {
    return async (dispatch) => {
      try {
        dispatch({type: actionTypes.FETCHING, isFetching: true});
  
        console.debug('Fetching: fetchSeriesDetail');
        const response = await fetch(`https://api.no-spoilers.net/series/${seriesId}`);
        const body = await response.json();

        console.log(`Details for series ${seriesId}:`, body);
    
        if (body.error) {
          console.error(body.error);
          dispatch({type: actionTypes.FETCHING, isFetching: false});
          return;
        }
  
        dispatch(actionCreators.fetchSeriesDetailSuccess(body));
        dispatch({type: actionTypes.FETCHING, isFetching: false});
  
      } catch(err) {
        console.log('Error in fetchSeriesDetail:', err);
        dispatch({type: actionTypes.FETCHING, isFetching: false});
      }
    }
  },
  
  fetchSeriesDetailSuccess: (seriesData) => ({
    type: actionTypes.ADD_SERIES_DETAIL,
    seriesData
  })
}
