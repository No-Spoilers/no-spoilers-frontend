import React, { Component } from 'react';

import './App.css';
import ContentFrame from './components/ContentFrame/ContentFrame';
import NavigationFrame from './components/NavigationFrame/NavigationFrame';
import cookies from './lib/cookies';

export default class App extends Component {
  state = {
    user: null,
    activeContent: null
  }

  componentDidMount()  {
    const savedData = cookies.get();
    if (savedData){
      this.setState({
        user: cookies.get(),
        activeContent: 'browse'
      });
    }
  }

  navHandler = (selection) => {
    this.setState({
      activeContent: selection
    })
  }

  render() {
    return (
      <div className="App">
        <NavigationFrame
          className="navigation-frame"
          user={this.state.user}
          navHandler={this.navHandler} 
        />
        <ContentFrame
          className="content-frame"
          content={this.state.activeContent}
          setUser={user => this.setState({user})}
        />
      </div>
    );
  }
}

