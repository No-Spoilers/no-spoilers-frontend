import actionTypes from "./actionTypes";
import fetchSeriesDetail from "./async/fetchSeriesDetail";
import fetchSeriesList from "./async/fetchSeriesList";
import postNewBook from "./async/postNewBook";
import updateBook from "./async/updateBook";
import postNewSeries from "./async/postNewSeries";
import updateSeries from "./async/updateSeries";
import setSpoilerLevel from "./async/setSpoilerLevel";
import fetchUserLevels from "./async/fetchUserLevels";
import postNewEntry from "./async/postNewEntry";

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

  postNewSeries,

  updateSeries,
  
  updateSeriesDetails: (seriesData) => ({
    type: actionTypes.UPDATE_SERIES_DETAIL,
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

  setSpoilerLevel,

  fetchUserLevels,  

  updateUserLevels: (userLevels) => ({
    type: actionTypes.UPDATE_USER_LEVELS,
    userLevels
  }),

  postNewEntry,

  updateEntries: (entryData) => ({
    type: actionTypes.UPDATE_ENTRY_DATA,
    entryData
  })
}

export default actionCreators;