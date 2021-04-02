import { connect } from 'react-redux';

export const actionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  ADD_SERIES_LIST: 'ADD_SERIES',
  FETCHING: 'FETCHING'
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const matchDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch({type: actionTypes.LOGOUT_USER}),
    setUser: (user) => dispatch({type: actionTypes.SET_USER, user}),
    setSeriesList: (seriesList) => dispatch({type: actionTypes.ADD_SERIES_LIST, seriesList}),
    signalFetching: (isFetching) => dispatch({type: actionTypes.IS_FETCHING, isFetching})
  }
}

export const reduxConnect = connect(mapStateToProps, matchDispatchToProps);
