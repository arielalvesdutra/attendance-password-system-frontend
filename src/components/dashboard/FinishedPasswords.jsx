import React, { Component } from 'react'
import { connect } from 'react-redux'

import './styles.css'
import { fetch10LastFinishedPasswords } from '../../redux/actions/attendancePasswords'

class FinishedPasswords extends Component {
     
     componentDidMount() {
          this.props.onFetch10LastFinishedPasswords()

          const interval = 10000

          setInterval(() => {
               this.props.onFetch10LastFinishedPasswords()
               },
               interval
          )
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

const mapStateToProps = ({ passwords }) => {

     const finishedPasswords = passwords.finishedPasswords

     return {
          finishedPasswords
     }
}

const mapDispatchToProps = dispatch => {

     return {
          onFetch10LastFinishedPasswords: () => 
               dispatch(fetch10LastFinishedPasswords())
     }
}

export default connect(
     mapStateToProps, mapDispatchToProps
)(FinishedPasswords)
