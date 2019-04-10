import React, { Component } from 'react';
import './App.css';

import Content from './Components/Templates/Content'
import Footer from './Components/Templates/Footer'
import Header from './Components/Templates/Header'
import Nav from './Components/Templates/Nav'

import KeyLine from './Components/KeyLine'

class App extends Component {
  render() {
    return (
      <div className="App d-flex flex-column align-items-center justify-content-between">
        <Header></Header>
        <Nav></Nav>
        <Content></Content>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
