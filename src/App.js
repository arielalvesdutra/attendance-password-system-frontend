import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './App.css';

import { isLogged } from './auth'
import { isAdmin } from './user'

import AllPasswords from './pages/passwords/AllPasswords'
import Dashboard from './pages/passwords/Dashboard'
import HomePage from './pages/home/Home'
import LoginPage from './pages/login/Login'
import Error404 from './pages/errors/Error404'
import RegisterPage from './pages/RegisterPage'
import RegisterPassword from './pages/passwords/RegisterPassword'
import UserPage from './pages/users/UserPage'
import EditUser from './pages/users/EditUser'

const PrivateRoute = ({ path, component, ...rest }) => (

  isLogged()
    ? (<Route path={path} component={component} />)
    : <Redirect to="/login" />
)

const AdminRoute = ({ path, component, ...rest }) => (

  isLogged() && isAdmin()
    ? (<Route path={path} component={component} />)
    : <Redirect to="/" />
)

const LoginRoute = ({ path, component, ...rest }) => (

  isLogged()
    ? <Redirect to="/" />
    : <Route path="/login" component={LoginPage} />
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
          <LoginRoute path="/login" component={LoginPage} />
          <AdminRoute path="/registers" component={RegisterPage} />
          <AdminRoute exact path="/users" component={UserPage} />
          <AdminRoute path="/users/:id/edit" component={EditUser} />
          <PrivateRoute path="*" component={Error404} />
        </Switch>
      </Router>
    )
  }
}

export default App;
