import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import ContentFrame from './components/ContentFrame/ContentFrame';
import NavigationFrame from './components/NavigationFrame/NavigationFrame';


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

  return (
    <Router>
      <div className="App">
        <NavigationFrame />
        <ContentFrame />
      </div>
    </Router>
  );
}

export default App;