import React from 'react'

import './FormButton.css'

const FormButton = ({ type, text, mt = '', ml = '' }) => (
  <div className={`form-row ${mt ? mt : ''} ${ml ? ml : ''}`}>
    <div className="col-12">
      <button type={type} className="FormButton ">{text}</button>
    </div>
  </div>
)

export default FormButton