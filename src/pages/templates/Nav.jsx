import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'
import { isAdmin } from '../../user'

export default props => {
    const pathname = window.location.pathname

    return <nav className="Nav">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/" className={`nav-link 
                                        ${pathname === '/' ? 'active' : ''}`}
                >
                    Realizar atendimento
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/list-passwords" className={`nav-link 
                                        ${pathname === '/list-passwords' ? 'active' : ''}`}
                >
                    Todas as senhas
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/register-password" className={`nav-link 
                                        ${pathname === '/register-password' ? 'active' : ''}`}
                >
                    Cadastrar senha
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/dashboard" className={`nav-link 
                                        ${pathname === '/dashboard' ? 'active' : ''}`}
                >
                    Dashboard
                </Link>
            </li>

            {isAdmin()
                ? (<li className="nav-item">
                    <Link to="/registers" className={`nav-link 
                                    ${pathname === '/registers' ? 'active' : ''}`}>
                        Cadastros
                    </Link>
                </li>

                )
                : ''
            }
        </ul>
    </nav>
}