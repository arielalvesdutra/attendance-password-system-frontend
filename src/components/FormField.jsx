import React from 'react'

export default ({ type, name, placeholder, mt }) => (
  <div className={'form-row ' + mt}>
    <div className="col-12">
      <input type={type} className="form-control" name={name}
        placeholder={placeholder} />
    </div>
  </div>
)