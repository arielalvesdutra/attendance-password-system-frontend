import React from 'react'

const FormButton = ({ type, text }) => (
  <div className="form-row mt-3">
    <div className="col-12">
      <button type={type} className="btn btn-primary form-control">{text}</button>
    </div>
  </div>
)

export default FormButton