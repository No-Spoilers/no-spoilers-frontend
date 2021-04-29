import React from 'react';
import { reduxConnect } from '../../redux/tools';
import './HomePage.css';

const HomePage = (props) => (
  <div className="home-page-container">
    <div className="home-page">
      This homepage frame will contain a list of featured series and site statistics.    
    </div>
  </div>
);


export default reduxConnect(HomePage);
