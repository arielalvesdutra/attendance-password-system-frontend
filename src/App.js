import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import HomePage from './Components/Pages/Home'
import AllPasswords from './Components/Pages/AllPasswords'
import NotFound from './Components/Pages/NotFound'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/list-passwords" component={AllPasswords} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App;
