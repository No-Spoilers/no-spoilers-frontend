import { connect } from 'react-redux';

export const actionTypes = {
  SET_USER: 'SET_USER',
  REMOVE_USER: 'REMOVE_USER',
  ADD_SERIES_LIST: 'ADD_SERIES',
  IS_FETCHING: 'IS_FETCHING',
  NOT_FETCHING: 'NOT_FETCHING'
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

const matchDispatchToProps = dispatch => {
  return {
    onUserRemoved: () => dispatch({type: actionTypes.REMOVE_USER}),
    setUser: (user) => dispatch({type: actionTypes.SET_USER, user}),
    setSeriesList: (seriesList) => dispatch({type: actionTypes.ADD_SERIES_LIST, seriesList}),
    signalFetching: () => dispatch({type: actionTypes.IS_FETCHING}),
    signalNotFetching: () => dispatch({type: actionTypes.NOT_FETCHING})
  }
}

export const reduxConnect = connect(mapStateToProps, matchDispatchToProps);
