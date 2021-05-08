import actionTypes from "./actionTypes";

const initialState = {
  userName: null,
  userEmail: null,
  userToken: null,
  isFetching: false,
  seriesList: [],
  seriesDetails: {},
  userSpoilerLevel: {}
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

      const books = seriesEntries
        .filter(item => item.bookId && !item.entryId)
        .reduce((acc, item) => {
          acc[item.bookId] = item;
          return acc;
        }, {});

      const entries = seriesEntries
        .filter(item => item.entryId)
        .reduce((acc, item) => {
          acc[item.entryId] = item;
          return acc;
        }, {});

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