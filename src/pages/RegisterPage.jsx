import React from 'react'

import AbstractPage from './AbstractPage'

import './RegisterPage.css'

import RegisterComponent from '../components/registers/Registers'

export default props => {
    return (
        <AbstractPage articleTitle="Realizar cadastros">
            <RegisterComponent />
        </AbstractPage>
    )
}
