import React from 'react'

import AbstractPage from './AbstractPage'
import './RegisterPassword.css'
import Register from '../components/register-password/Register'

export default props => {
    return (
        <AbstractPage articleTitle="Registrar senha">
            <div className="RegisterPassword">
                <Register />
            </div>
        </AbstractPage>
    )
}
