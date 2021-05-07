import actionTypes from "./actionTypes";
import fetchSeriesDetail from "./async/fetchSeriesDetail";
import fetchSeriesList from "./async/fetchSeriesList";
import postNewBook from "./async/postNewBook";
import updateBook from "./async/updateBook";

const actionCreators = {
  logoutUser: () => ({type: actionTypes.LOGOUT_USER}),

  setUser: (user) => ({type: actionTypes.SET_USER, user}),
 
  setFetchingStatus: (isFetching) => ({type: actionTypes.FETCHING, isFetching}),

  fetchSeriesList,  

  fetchSeriesListSuccess: (seriesList) => ({
    type: actionTypes.UPDATE_SERIES_LIST,
    seriesList
  }),

  fetchSeriesDetail,
  
  updateSeriesEntries: (seriesEntries) => ({
    type: actionTypes.UPDATE_SERIES_ENTRIES,
    seriesEntries
  }),

  
  fetchSeriesDetailSuccess: (seriesData) => ({
    type: actionTypes.ADD_SERIES_DETAIL,
    seriesData
  }),

  postNewBook,
  
  postNewBookSuccess: (bookData) => ({
    type: actionTypes.UPDATE_BOOK_DETAIL,
    bookData
  }),

  updateBook,
  
  updateBookSuccess: (bookData) => ({
    type: actionTypes.UPDATE_BOOK_DETAIL,
    bookData
  }),

}

export default actionCreators;