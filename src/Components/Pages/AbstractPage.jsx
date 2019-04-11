import React from 'react'

import Content from '../Templates/Content'
import Footer from '../Templates/Footer'
import Header from '../Templates/Header'
import Nav from '../Templates/Nav'

export default props =>
    <div className="App d-flex flex-column align-items-center justify-content-between">
        <Header></Header>
        <Nav></Nav>
        <Content title={props.articleTitle}>
            {props.children}
        </Content>
        <Footer></Footer>
    </div>