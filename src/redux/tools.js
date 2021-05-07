import { connect } from 'react-redux';
import actionCreators from './actionCreators';

const mapStateToProps = state => {
  return {
    ...state
  }
}

const matchDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(actionCreators.logoutUser()),
    setUser: (user) => dispatch(actionCreators.setUser(user)),
    signalFetching: (isFetching) => dispatch(actionCreators.setFetchingStatus(isFetching)),
    getSeriesDetail: (seriesId) => dispatch(actionCreators.fetchSeriesDetail(seriesId)),
    postNewBook: (bookData) => dispatch(actionCreators.postNewBook(bookData)),
    updateBook: (bookData) => dispatch(actionCreators.updateBook(bookData))
  }
}

export const reduxConnect = connect(mapStateToProps, matchDispatchToProps);
