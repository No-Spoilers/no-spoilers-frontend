import { actionTypes } from './actions';

const initialState = {
  userName: null,
  userEmail: null,
  userToken: null,
  isFetching: false,
  seriesList: [],
  seriesDetails: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SET_USER: {
      return {
        ...state,
        ...action.user
      };
    }

    case actionTypes.LOGOUT_USER: {
      ['name','token','email'].forEach(item => localStorage.removeItem(item));
      return {
        ...state,
        userName: null,
        userEmail: null,
        userToken: null,
      };
    }

    case actionTypes.ADD_SERIES_LIST: {
      const seriesDetails = {};
      action.seriesList.forEach(series => {
        seriesDetails[series.seriesId] = {...state.seriesDetails[series.seriesId], ...series};
      });

      return {
        ...state,
        seriesList: action.seriesList,
        seriesDetails
      };
    }

    case actionTypes.ADD_SERIES_DETAIL: {
      const { seriesData } = action;

      const [series] = seriesData.filter(item => !item.bookId && !item.entryId);
      const books = seriesData.filter(item => item.bookId && !item.entryId);
      const entries = seriesData.filter(item => item.entryId);
      const timeStamp = (new Date()).toISOString();

      const seriesDetails = { ...state.seriesDetails };
      seriesDetails[series.seriesId] = { 
        ...state.seriesDetails[series.seriesId], 
        ...series,
        books,
        entries,
        timeStamp
      };

      return {
        ...state,
        seriesDetails
      };
    }

    case actionTypes.ADD_NEW_BOOK: {
      const bookData = action.bookData;
      const seriesDetails = {...state.seriesDetails};
      seriesDetails[bookData.seriesId] = {
        ...seriesDetails[bookData.seriesId]
      };
      seriesDetails[bookData.seriesId].books = [
        ...seriesDetails[bookData.seriesId].books,
        bookData
      ];

      return {
        ...state,
        seriesDetails
      };
    }

    case actionTypes.FETCHING: {
      if (typeof action.isFetching === 'boolean') {
        return {
          ...state,
          isFetching: action.isFetching
        };
      }

      return state;
    }

    default: 
      return state;
  }
}

export default reducer;