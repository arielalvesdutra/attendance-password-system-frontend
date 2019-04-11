import React from 'react'

import './Nav.css'

export default props =>
    <nav className="Nav">
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link active" href="#link">Realizar atendimento</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#link">Todas as senhas</a>
            </li>
        </ul>
    </nav>