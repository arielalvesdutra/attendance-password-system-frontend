import React from 'react'

import AbstractPage from '../templates/SystemLayout'
import AttendanceComponent from '../../components/attendance/Attendance'

const HomePage = props => (
    <AbstractPage articleTitle="Realizar atendimento">
        <AttendanceComponent />
    </AbstractPage>
)

export default HomePage
