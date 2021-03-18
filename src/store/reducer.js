import { actionTypes } from './reduxTools';

const initialState = {
  userName: null,
  userEmail: null,
  userToken: null,
  isFetching: false,
  seriesList: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER: 
      return {
        ...state,
        ...action.user
      };
    case actionTypes.REMOVE_USER: 
      ['name','token','email'].forEach(item => localStorage.removeItem(item));
      return {
        ...state,
        userName: null,
        userEmail: null,
        userToken: null,
      };
    case actionTypes.ADD_SERIES_LIST: 
      return {
        ...state,
        seriesList: action.seriesList
      };
    default: 
      return state;
  }
}

export default reducer;