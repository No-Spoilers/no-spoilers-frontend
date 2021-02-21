import React from 'react';
import AccountPage from '../AccountPage/AccountPage';
import LoginPage from '../LoginPage/LoginPage';
import SeriesList from '../SeriesList/SeriesList';
import './ContentFrame.css';

const ContentFrame = (props) => {
  return (
    <div className="content-frame">
      { props.content === 'browse' ? <SeriesList /> :
        props.content === 'login' ? <LoginPage setUser={props.setUser} navHandler={props.navHandler} /> : 
        props.content === 'account' ? <AccountPage user={props.user} logout={props.logout} /> : 
        props.content === 'search' ? <h1>Search Frame Here</h1> : 
        <h1>No content</h1>
      }
    </div>
  )
}

export default ContentFrame;