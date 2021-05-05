import { connect } from 'react-redux';
import { actionCreators } from './actions';

const mapStateToProps = state => {
  return {
    ...state
  }
}

const matchDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(actionCreators.logoutUser()),
    setUser: (user) => dispatch(actionCreators.setUser(user)),
    setSeriesList: (seriesList) => dispatch(actionCreators.setSeriesList(seriesList)),
    signalFetching: (isFetching) => dispatch(actionCreators.setFetchingStatus(isFetching)),
    getSeriesDetail: (seriesId) => dispatch(actionCreators.fetchSeriesDetail(seriesId)),
    postNewBook: (bookData) => dispatch(actionCreators.postNewBook(bookData)),
    putBook: (bookData) => dispatch(actionCreators.putBook(bookData))
  }
}

export const reduxConnect = connect(mapStateToProps, matchDispatchToProps);
