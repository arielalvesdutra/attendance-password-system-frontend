import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import './styles.css'
import { addCurrentPassword } from '../../redux/actions/attendancePasswords'
import { backendUrl } from '../../backend'

class CurrentPassword extends Component {

     componentDidMount() {
          this.fetchCurrentPassword()
          const interval = 10000

          setInterval(() => {
               this.fetchCurrentPassword()
          },
               interval
          )
     }

     fetchCurrentPassword = () => {
          axios.get(
               `${backendUrl}/attendance-passwords/search/retrieve-last-in-progress`)
               .then(response => {
                    this.props.addCurrentPassword(response.data)
          }).catch()
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

const mapStateToProps = ({ currentPassword }) => {

     return {
          currentPassword
     }
}

const mapDispatchToProps = dispatch => {
     return {
          addCurrentPassword: passwords => dispatch(addCurrentPassword(passwords))
     }
}

export default connect(
     mapStateToProps, mapDispatchToProps
)(CurrentPassword)