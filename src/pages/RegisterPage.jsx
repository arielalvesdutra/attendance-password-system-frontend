import React from 'react'

import AbstractPage from './templates/SystemLayout'

import './RegisterPage.css'

import RegisterComponent from '../components/registers/Registers'

export default props => {
    return (
        <AbstractPage articleTitle="Realizar cadastros">
            <RegisterComponent />
        </AbstractPage>
    )
}
