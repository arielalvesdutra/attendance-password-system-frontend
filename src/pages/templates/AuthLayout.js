import React from 'react'

import Content from './Content'
import Footer from './Footer'
import Header from './Header'

export default props =>
    <div className="App d-flex flex-column align-items-center justify-content-between">
        <Header></Header>
        <Content title={props.articleTitle}>
            {props.children}
        </Content>
        <Footer></Footer>
    </div>
