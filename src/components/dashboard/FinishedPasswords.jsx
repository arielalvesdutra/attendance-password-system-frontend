import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import './styles.css'
import { add10LastFinishedPasswords } from '../../redux/actions/attendancePasswords'
import { backendUrl } from '../../backend'

class FinishedPasswords extends Component {
     
     componentDidMount() {
          this.fetch10LastFinishedPasswords()
          const interval = 10000
          setInterval(() => {
               this.fetch10LastFinishedPasswords()
               },
               interval
          )
     }

     fetch10LastFinishedPasswords = () => {
          axios.get(
               `${backendUrl}/attendance-passwords/search/retrieve-10-last-finished`)
               .then(response => {
                    this.props.add10LastFinishedPasswords(response.data)
               })
     }

     render() {

          const passwords = this.props.finishedPasswords

          const content = passwords && passwords.length
               ? passwords.map((password, key) => 
                    (<div key={key} className="form-row line">
                         {password.name} - {password.ticketWindow.name}
                    </div>)
               )
               : 'Nenhum atendimento finalizado.'

          return (
               <div className="in-progress shared">
                    <h4>Senhas finalizadas</h4>
                    <hr />
                    {content}
               </div>
          )
     }
}

const mapStateToProps = ({ finishedPasswords }) => {

     return {
          finishedPasswords
     }
}

const mapDispatchToProps = dispatch => {
     return {
          add10LastFinishedPasswords: passwords => dispatch(add10LastFinishedPasswords(passwords))
     }
}

export default connect(
     mapStateToProps, mapDispatchToProps
)(FinishedPasswords)
