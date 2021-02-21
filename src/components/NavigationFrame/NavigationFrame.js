import React from 'react';
import './NavigationFrame.css';

const NavigationFrame = (props) => {

  let userDiv = null;
  
  if (props.user && props.user.name) {
    userDiv = (
      <div className="account-info"  onClick={() => props.navHandler('account')}>
        {props.user.name}
      </div>
    )
  }

  return (
    <div className="navigation-frame">
      <div className="title-box">
        <h1>No Spoilers</h1>
        <p>This is the starting stub for https://no-spoilers.net</p>
        <p>Work in progress</p>
      </div>

      <div className="nav-button-box">
        {userDiv}
        {props.user && props.user.name 
          ? <div className="nav-option">My Series</div> 
          : <div className="nav-option" onClick={() => props.navHandler('login')}>Login/Signup</div> 
        }
        <div className="nav-option" onClick={() => props.navHandler('browse')}>Browse</div>
        <div className="nav-option" onClick={() => props.navHandler('search')}>Search</div>
      </div>
    </div>
  )
  
}

export default NavigationFrame;