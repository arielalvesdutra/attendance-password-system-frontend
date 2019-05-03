import React from 'react'

export default ({ message }) => {
  return message
    ? (
      <div className="form-row mt-2 text-danger" >
        <div className="col-12">
          {message}
        </div>
      </div >
    )
    : ''
}