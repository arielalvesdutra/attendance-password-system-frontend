import React from 'react'

import AbstractPage from './AbstractPage'
import AttendanceComponent from '../components/attendance/Attendance'

const HomePage = props => (
    <AbstractPage articleTitle="Realizar atendimento">
        <AttendanceComponent />
    </AbstractPage>
)

export default HomePage
