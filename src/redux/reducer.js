import actionTypes from "./actionTypes";

const initialState = {
  userName: null,
  userEmail: null,
  userToken: null,
  isFetching: false,
  seriesList: [],
  seriesDetails: {},
  userSpoilerLevel: {},
  lookUp: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SET_USER: {
      return {
        ...state,
        ...action.user
      };
    }

    case actionTypes.UPDATE_USER_LEVELS: {
      const { userLevels } = action;

      const userSpoilerLevel = {
        ...state.userSpoilerLevel,
        ...userLevels
      };

      return {
        ...state,
        userSpoilerLevel
      }
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

    case actionTypes.UPDATE_SERIES_LIST: {
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

    case actionTypes.UPDATE_SERIES_ENTRIES: {
      const { seriesEntries } = action;

      const [series] = seriesEntries.filter(item => !item.bookId && !item.entryId);

      const { books, bookLookUp } = seriesEntries
        .filter(item => item.bookId && !item.entryId)
        .reduce((acc, item) => {
          acc.books[item.bookId] = item;
          acc.bookLookUp[item.bookId] = item.seriesId;
          return acc;
        }, {books:{}, bookLookUp:{}});

      const { entries, entryLookUp } = seriesEntries
        .filter(item => item.entryId)
        .reduce((acc, item) => {
          acc.entries[item.entryId] = item;
          acc.entryLookUp[item.entryId] = item.seriesId;
          return acc;
        }, { entries: {}, entryLookUp: {} });

      const timeStamp = (new Date()).toISOString();

      const seriesDetails = { ...state.seriesDetails };
      seriesDetails[series.seriesId] = { 
        ...state.seriesDetails[series.seriesId], 
        ...series,
        books,
        entries,
        timeStamp
      };

      const lookUp = {
        ...state.lookUp,
        ...bookLookUp,
        ...entryLookUp
      }
      
      return {
        ...state,
        seriesDetails,
        lookUp
      };
    }

    case actionTypes.UPDATE_SERIES_DETAIL: {
      const { seriesData } = action;

      const seriesDetails = { ...state.seriesDetails };
      seriesDetails[seriesData.seriesId] = {
        ...seriesDetails[seriesData.seriesId],
        ...seriesData
      };

      return {
        ...state,
        seriesDetails
      };
    }

    case actionTypes.UPDATE_BOOK_DETAIL: {
      const bookData = action.bookData;
      
      const seriesDetails = { ...state.seriesDetails };
      seriesDetails[bookData.seriesId] = {
        ...seriesDetails[bookData.seriesId]
      };
      seriesDetails[bookData.seriesId].books = {
        ...seriesDetails[bookData.seriesId].books
      };
      seriesDetails[bookData.seriesId].books[bookData.bookId] = bookData;

      const lookUp = {
        ...state.lookUp,
        [`${bookData.bookId}`]: bookData.seriesId
      };

      return {
        ...state,
        seriesDetails,
        lookUp
      };
    }
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