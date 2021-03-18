import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import ContentFrame from './components/ContentFrame/ContentFrame';
import NavigationFrame from './components/NavigationFrame/NavigationFrame';
import { reduxConnect } from './store/reduxTools';


const App = (props) => {
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
  
  const getSeriesList = async () => {
    props.signalFetching();

    const response = await fetch('https://api.no-spoilers.net/series');
    const body = await response.json();

    props.signalNotFetching();
    if (body && body.length > 0) {
      props.setSeriesList(body);  
    } else {
      props.setSeriesList(['load error']);  
    }
  }
  
  if (!props.isFetching && props.seriesList.length === 0) {
    getSeriesList();
  }

  return (
    <Router>
      <div className="App">
        <NavigationFrame />
        <ContentFrame />
      </div>
    </Router>
  );
}

export default reduxConnect(App);