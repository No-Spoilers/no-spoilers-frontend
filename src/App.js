import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom"

import './App.css';
import ContentFrame from './components/ContentFrame/ContentFrame';
import NavigationFrame from './components/NavigationFrame/NavigationFrame';

export default class App extends Component {
  state = {
    user: null,
    isFetching: false,
    seriesList: []
  }

  componentDidMount()  {
    this.setState({user:{...localStorage}});
    this.getSeriesList();
  }
  
  getSeriesList = async () => {
    this.setState({isFetching: true});

    const response = await fetch('https://api.no-spoilers.net/series');
    const body = await response.json();

    this.setState({
      isFetching: false,
      seriesList: body
    });
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      user: null
    })
  }

  render() {
    return (
      <Router>
        <div className="App">

          <NavigationFrame
            user={this.state.user}
            navHandler={this.navHandler} 
          />
          <ContentFrame
            setUser={user => this.setState({user})}
            logout={this.logout}
            user={this.state.user}
            isFetching={this.isFetching} 
            seriesList={this.state.seriesList}
          />

        </div>
      </Router>
    );
  }
}
