import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import ContentFrame from './components/ContentFrame/ContentFrame';
import NavigationFrame from './components/NavigationFrame/NavigationFrame';
import HeaderFrame from './components/HeaderFrame/HeaderFrame';
import { reduxConnect } from './redux/tools';


const App = (props) => {
  useEffect(() => {
    if (!props.userToken) {
      const user = {
        userName: localStorage.getItem('name'),
        userToken: localStorage.getItem('token'),
        userEmail: localStorage.getItem('email')
      };
      if (user.userToken) {
        props.setUser(user);
      }
    }
  })

  const fetchStatus = props.isFetching ? {} : {display: 'none'};

  return (
    <Router>
      <div className="App">
        <HeaderFrame />
        <NavigationFrame />
        <ContentFrame />
        
      </div>
      
      <div className="loading-banner" style={fetchStatus}>&gt;&gt;&gt; REFRESHING DATA &lt;&lt;&lt;</div>
    </Router>
  );
}

export default reduxConnect(App);