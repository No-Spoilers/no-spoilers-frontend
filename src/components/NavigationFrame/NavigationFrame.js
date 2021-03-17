import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationFrame.css';

const NavigationFrame = (props) => {

  let userDiv = null;
  
  if (props.user && props.user.name) {
    userDiv = (
      <Link to='/account'>
        <div className="account-info">
          {props.user.name}
        </div>
      </Link>
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
          ? <Link to='/'><div className="nav-option">My Series (tbd)</div></Link> 
          : <Link to='/login'><div className="nav-option">Login/Signup</div></Link> 
        }
        <Link to='browse'><div className="nav-option">Browse</div></Link>
        <Link to='search'><div className="nav-option">Search</div></Link>
      </div>
    </div>
  )
  
}

export default NavigationFrame;