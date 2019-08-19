import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'

import './ListAllPasswords.css'

import { fetchAllPasswords } from '../redux/actions/attendancePasswords'

import PasswordCommonLine from './PasswordCommonLine'

class ListAllPasswords extends Component {

  componentDidMount = () => {
    this.props.onFetchAllPasswords()
  }

  render() {
    console.log(this.props)
    return (
      <div className="col-12">
        <div className="mt-4">
          <h5>Todas as senhas</h5>
          <hr />
          <div>
            {this.props.passwords.isLoadingAllPasswords === true && (
              <ClipLoader />
            )}
            {this.props.passwords.isLoadingAllPasswords === false &&
             this.props.passwords.passwords.length > 0 && 
             this.props.passwords.passwords.map((password, key) => (
               <PasswordCommonLine 
                  key={key} 
                  password={password} 
                  ticketWindow={password.ticketWindow}>
                 
               </PasswordCommonLine>
             ))
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchAllPasswords: () => dispatch(fetchAllPasswords()), 
  }
}

const mapStateToProps = ({ passwords}) => {
  return {
    passwords
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(ListAllPasswords)
