import React from 'react'

import AbstractPage from '../templates/SystemLayout'

import ListAllPasswords from '../../components/ListAllPasswords'

export default props =>
    <AbstractPage articleTitle="Todas as senhas">
        <ListAllPasswords />
    </AbstractPage>
