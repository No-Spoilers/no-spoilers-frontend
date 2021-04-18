import { connect } from 'react-redux';
import { actionTypes } from './actions';

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
    signalFetching: (isFetching) => dispatch({type: actionTypes.FETCHING, isFetching}),
  }
}

export const reduxConnect = connect(mapStateToProps, matchDispatchToProps);
