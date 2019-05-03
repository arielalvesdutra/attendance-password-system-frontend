import React from 'react'

import Content from './templates/Content'
import Footer from './templates/Footer'
import Header from './templates/Header'

import LoginComponent from '../components/login/Login'

export default props =>
  <div className="App d-flex flex-column align-items-center justify-content-between">
    <Header />
    <Content title="Página de Login">
      <LoginComponent />
    </Content>
    <Footer />
  </div>