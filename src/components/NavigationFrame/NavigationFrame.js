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
        ? <div className="nav-option"><span className="user-name">{props.user.name}</span><br/>My Series</div> 
        : <div className="nav-option" onClick={() => loginClickHandler()}>Login/Signup</div> 
      }
      <div className="nav-option" onClick={() => props.navHandler('browse')}>Browse</div>
      <div className="nav-option" onClick={() => props.navHandler('search')}>Search</div>
    </div>
  )
  
}

export default NavigationFrame;