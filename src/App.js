import React, { Component } from 'react';

import './App.css';
import ContentFrame from './components/ContentFrame/ContentFrame';
import NavigationFrame from './components/NavigationFrame/NavigationFrame';

export default class App extends Component {
  state = {
    user: null,
    activeContent: null
  }

  componentDidMount()  {
    this.setState({user:{...localStorage}});
  }

  navHandler = (selection) => {
    this.setState({
      activeContent: selection
    })
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      user: null,
      activeContent: 'login'
    })
  }

  render() {
    return (
      <div className="App">
        <NavigationFrame
          user={this.state.user}
          navHandler={this.navHandler} 
        />
        <ContentFrame
          content={this.state.activeContent}
          setUser={user => this.setState({user})}
          logout={this.logout}
          user={this.state.user}
        />
      </div>
    );
  }
}

