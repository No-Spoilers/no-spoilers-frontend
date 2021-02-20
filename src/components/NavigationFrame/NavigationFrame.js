import React from 'react';
import './NavigationFrame.css';

const NavigationFrame = (props) => {
  const loginClickHandler = () => {
    console.log('login clicked')
    props.navHandler('login')
  }

  
  return (
    <div>
      <h1>No Spoilers</h1>
      <p>This is the starting stub for https://no-spoilers.net</p>
      <p>Work in progress</p>

      {props.user 
        ? <div className="nav-option">{props.user.name}: My Series</div> 
        : <div className="nav-option" onClick={() => loginClickHandler()}>Login/Signup</div> 
      }
      <div className="nav-option">Browse</div>
      <div className="nav-option">Search</div>
    </div>
  )
  
}

export default NavigationFrame;