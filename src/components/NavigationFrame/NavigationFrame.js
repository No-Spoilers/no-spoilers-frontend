import React from 'react';
import { Link } from 'react-router-dom';
import { reduxConnect } from '../../redux/tools';
import './NavigationFrame.css';

const NavigationFrame = (props) => (
  <div className="navigation-frame">
    <div className="title-box">
      <p>This is the starting stub for https://no-spoilers.net</p>
      <p>Work in progress</p>
    </div>

    <div className="nav-button-box">
      <Link to='/'><div className="nav-option">Home</div></Link>
      <Link to='/browse'><div className="nav-option">Browse</div></Link>
    </div>
  </div>
)

export default reduxConnect(NavigationFrame);