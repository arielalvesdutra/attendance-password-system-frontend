import React from 'react'

const ErrorField = ({ message }) => {
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

export default ErrorField