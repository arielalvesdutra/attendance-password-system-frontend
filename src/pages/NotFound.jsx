import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import AbstractPage from './AbstractPage'

import './NotFound.css'

export default props =>
    <AbstractPage articleTitle="404 - Página Não Encontrada">
    <div className="NotFound-span">

        <FontAwesomeIcon icon={faExclamationTriangle} size="4x" color="#ffc107"/>
        <h1 className="NotFound-h1">Ops, página não encontrada...</h1>
    </div>
    </AbstractPage>
