import React from 'react';
import { Switch, Route } from "react-router-dom"

import AccountPage from '../AccountPage/AccountPage';
import LoginPage from '../LoginPage/LoginPage';
import SeriesList from '../SeriesList/SeriesList';
import SignupPage from '../SignupPage/SignupPage';
import AddSeries from '../AddSeries/AddSeries';
import SeriesView from '../SeriesView/SeriesView';
import './ContentFrame.css';
import HomePage from '../HomePage/HomePage';

const ContentFrame = (props) => {
  return (
    <div className="content-frame">
      <Switch>
        <Route path="/browse">
          <SeriesList />
        </Route>

        <Route path="/login">
          <LoginPage /> 
        </Route>

        <Route path="/signup">
          <SignupPage />
        </Route>

        <Route path="/account">
          <AccountPage />
        </Route>

        <Route path="/new">
          <AddSeries />
        </Route>

        <Route path="/search">
          <h1>Search Frame Here</h1>
        </Route>

        <Route path="/:id">
          <SeriesView />
        </Route>

        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

    </div>
  )
}

export default ContentFrame;