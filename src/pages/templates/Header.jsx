import React from 'react'

import './Header.css'
import { isLogged, logOut } from '../../auth'
import { getUserName } from '../../user'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default props =>
    <header className="Header">
        <div>
            <FontAwesomeIcon icon={faTicketAlt} />
            <span className="ml-2">
                Attendance Password System
            </span>
        </div>
        {isLogged()
            ? (
                <span className="logout">
                    <span>{ getUserName() } | </span>
                    <button onClick={logOut} className="logout-button" title="Deslogar">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </span>
            )
            : ''}

    </header>
