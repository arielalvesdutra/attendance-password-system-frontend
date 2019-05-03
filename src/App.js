import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './App.css';

import { isLogged } from './auth'

import AllPasswords from './pages/AllPasswords'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import NotFound from './pages/NotFound'
import RegisterPassword from './pages/RegisterPassword'

const PrivateRoute = ({ path, component, ...rest }) => (

  isLogged()
    ? (<Route path={path} component={component} />)
    : <Redirect to="/login" />
)

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/list-passwords" component={AllPasswords} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/register-password" component={RegisterPassword} />
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="*" component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App;
