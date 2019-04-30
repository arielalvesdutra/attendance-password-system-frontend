import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import AllPasswords from './pages/AllPasswords'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/Home'
import NotFound from './pages/NotFound'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/list-passwords" component={AllPasswords} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App;
