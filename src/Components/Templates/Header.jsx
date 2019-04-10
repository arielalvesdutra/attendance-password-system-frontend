import React from 'react'

import './Header.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons'

export default props =>
    <div className="Header">
        <FontAwesomeIcon icon={faTicketAlt} />
        <span className="ml-2">
            Attendance Password System
        </span>
    </div>