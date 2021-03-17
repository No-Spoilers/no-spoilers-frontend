import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom"

import './App.css';
import ContentFrame from './components/ContentFrame/ContentFrame';
import NavigationFrame from './components/NavigationFrame/NavigationFrame';

export default class App extends Component {
  state = {
    user: null,
    activePage: null,
    viewItem: null
  }

  componentDidMount()  {
    this.setState({user:{...localStorage}});
  }

  navHandler = (selection, viewItem) => {
    this.setState({
      activePage: selection,
      viewItem
    })
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
            activePage={this.state.activePage}
            viewItem={this.state.viewItem}
            setUser={user => this.setState({user})}
            logout={this.logout}
            user={this.state.user}
            navHandler={this.navHandler} 
          />

        </div>
      </Router>
    );
  }
}

