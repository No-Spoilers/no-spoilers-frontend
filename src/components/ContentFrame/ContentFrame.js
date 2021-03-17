import React from 'react';
import { Switch, Route } from "react-router-dom"

import AccountPage from '../AccountPage/AccountPage';
import LoginPage from '../LoginPage/LoginPage';
import SeriesList from '../SeriesList/SeriesList';
import SignupPage from '../SignupPage/SignupPage';
import AddSeries from '../AddSeries/AddSeries';
import SeriesView from '../SeriesView/SeriesView';
import './ContentFrame.css';

const ContentFrame = (props) => {
  return (
    <div className="content-frame">
      <Switch>
        <Route path="/browse">
          <SeriesList navHandler={props.navHandler} />
        </Route>

        <Route path="/login">
          <LoginPage setUser={props.setUser} navHandler={props.navHandler} /> 
        </Route>

        <Route path="/signup">
          <SignupPage setUser={props.setUser} navHandler={props.navHandler} />
        </Route>

        <Route path="/account">
          <AccountPage user={props.user} logout={props.logout} />
        </Route>

        <Route path="/new">
          <AddSeries user={props.user} logout={props.logout} navHandler={props.navHandler} />
        </Route>

        <Route path="/search">
          <h1>Search Frame Here</h1>
        </Route>

        <Route path="/:id">
          <SeriesView viewItem={props.viewItem} setUser={props.setUser} navHandler={props.navHandler} />
        </Route>
      </Switch>

    </div>
  )
}

export default ContentFrame;