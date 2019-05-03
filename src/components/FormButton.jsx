import React from 'react'

export default ({ type, text }) => (
  <div className="form-row mt-3">
    <div className="col-12">
      <button type={type} className="btn btn-primary form-control">{text}</button>
    </div>
  </div>
)