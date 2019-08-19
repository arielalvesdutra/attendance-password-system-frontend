import React, { Component } from 'react'
import { connect } from 'react-redux'

import './styles.css'
import { fetchCurrentPassword } from '../../redux/actions/attendancePasswords'

class CurrentPassword extends Component {

     componentDidMount() {

          this.props.onFetchCurrentPassword()

          const interval = 10000

          setInterval(() => {
               this.props.onFetchCurrentPassword()
          },
               interval
          )
     }

     render() {

          const currentPassword = this.props.currentPassword

          const content = currentPassword.name && currentPassword.ticketWindow
               ? `${currentPassword.name} -  ${currentPassword.ticketWindow.name}`
               : 'Nenhuma senha em atendimento.'

          return (

               <div className="current shared">
                    <b>Senha atual: </b>
                    <span  className="current-password-highlight">
                         {content}
                    </span>
               </div>
          )
     }
}

const mapStateToProps = ({ passwords }) => {

     const currentPassword = passwords.currentPassword

     return { currentPassword }
}

const mapDispatchToProps = dispatch => {

     return {
          onFetchCurrentPassword: () => dispatch(fetchCurrentPassword())
     }
}

export default connect(
     mapStateToProps, mapDispatchToProps
)(CurrentPassword)
