import React from 'react'

import './PasswordCommonLine.css'

const PasswordCommonLine = ({ password, ticketWindow = null }) => (
  <div className="password-common-line">
    <span>{password.name}</span>
    <span>{password.status.name}</span>
    <span>
      {ticketWindow ? ticketWindow.name : 'Nenhum Guichê selecionado'}
    </span>
  </div>
)

export default PasswordCommonLine
