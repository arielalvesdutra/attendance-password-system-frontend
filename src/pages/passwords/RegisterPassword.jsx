import React from 'react'

import AbstractPage from '../templates/SystemLayout'
import Register from '../../components/register-password/Register'

export default props => {
    return (
        <AbstractPage articleTitle="Cadastrar senha">
            <div className="RegisterPassword">
                <Register />
            </div>
        </AbstractPage>
    )
}
