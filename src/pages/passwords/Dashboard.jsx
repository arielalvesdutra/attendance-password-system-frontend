import React from 'react'

import AbstractPage from '../templates/SystemLayout'
import InProgressPasswords from '../../components/dashboard/InProgressPasswords'
import FinishedPasswords from '../../components/dashboard/FinishedPasswords'
import CurrentPassword from '../../components/dashboard/CurrentPassword'

import './Dashboard.css'

export default props => {
    return (
        <AbstractPage articleTitle="Dashboard">
            <div className="Dashboard">
                <div className="form-row">
                    <CurrentPassword />
                </div>
                <div className="form-row d-flex flex-wrap">
                    <InProgressPasswords />
                    <FinishedPasswords />
                </div>
            </div>
        </AbstractPage>
    )
}
