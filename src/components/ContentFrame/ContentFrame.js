import React from 'react';
import AccountPage from '../AccountPage/AccountPage';
import LoginPage from '../LoginPage/LoginPage';
import SeriesList from '../SeriesList/SeriesList';
import SignupPage from '../SignupPage/SignupPage';
import AddSeries from '../AddSeries/AddSeries';
import SeriesView from '../SeriesView/SeriesView';
import './ContentFrame.css';

const ContentFrame = (props) => {
  return (
    <div className="content-frame">
      { props.activePage === 'browse' ? <SeriesList navHandler={props.navHandler} /> :
        props.activePage === 'series' ? <SeriesView viewItem={props.viewItem} setUser={props.setUser} navHandler={props.navHandler} /> : 
        props.activePage === 'login' ? <LoginPage setUser={props.setUser} navHandler={props.navHandler} /> : 
        props.activePage === 'signup' ? <SignupPage setUser={props.setUser} navHandler={props.navHandler} /> : 
        props.activePage === 'account' ? <AccountPage user={props.user} logout={props.logout} /> : 
        props.activePage === 'create-series' ? <AddSeries user={props.user} logout={props.logout} navHandler={props.navHandler} /> : 
        props.activePage === 'search' ? <h1>Search Frame Here</h1> : 
        <h1>No content</h1>
      }
    </div>
  )
}

export default ContentFrame;