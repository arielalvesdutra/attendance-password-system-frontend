import React from 'react'

import Content from './templates/Content'
import Footer from './templates/Footer'
import Header from './templates/Header'
import Nav from './templates/Nav'

export default props =>
    <div className="App d-flex flex-column align-items-center justify-content-between">
        <Header></Header>
        <Nav></Nav>
        <Content title={props.articleTitle}>
            {props.children}
        </Content>
        <Footer></Footer>
    </div>