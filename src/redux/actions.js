export const actionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  ADD_SERIES_LIST: 'ADD_SERIES_LIST',
  ADD_SERIES_DETAIL: 'ADD_SERIES_DETAIL',
  FETCHING: 'FETCHING',
  ADD_NEW_BOOK: 'ADD_NEW_BOOK'
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
  }),

  postNewBook: (bookData) => {
    return async (dispatch) => {
      try {
        dispatch({type: actionTypes.FETCHING, isFetching: true});

        const data = {
          seriesId: bookData.seriesId,
          name: bookData.name,
          pubDate: bookData.pubDate
        }

        const headers = {
          "Content-type": "application/json;charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        };
  
        console.log('headers:', headers);
        console.log('data:', data);

        console.log('Fetching: postNewBook');
  
        const response = await fetch('https://api.no-spoilers.net/book', {
          method: "POST",
          body: JSON.stringify(data),
          headers
        });

        console.log('response:', response);

        
        if (response.status === 201) {
          const responseBody = await response.json();
  
          console.log('responseBody:', responseBody);

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
        console.log('Error in fetchSeriesDetail:', err);
        dispatch({type: actionTypes.FETCHING, isFetching: false});
        return { error: err };
      }
    }
  },
  
  postNewBookSuccess: (bookData) => ({
    type: actionTypes.ADD_NEW_BOOK,
    bookData
  })
}
