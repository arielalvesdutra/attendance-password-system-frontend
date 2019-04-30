import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import './styles.css'
import { add10LastFinishedPasswords } from '../../redux/actions/attendancePasswords'
import { backendUrl } from '../../backend'

class FinishedPasswords extends Component {

     constructor(props) {
          super(props)
          this.fetch10LastFinishedPasswords()
     }

     fetch10LastFinishedPasswords = () => {

          const props = this.props

          axios.get(
               `${backendUrl}/attendance-passwords/search/retrieve-10-last-finished`)
               .then(response => {
                    props.add10LastFinishedPasswords(response.data)
               })
     }

     render() {

          const passwords = this.props.finishedPasswords

          return (
               <div className="in-progress shared">
                    <h4>Senhas finalizadas</h4>
                    <hr />
                    {
                      passwords && passwords.length
                         ? passwords.map((password, key) => (
                              <div key={key} className="form-row line">
                                   {password.name} - {password.ticketWindow.name}
                              </div>
                          )
                         )
                         : 'Nenhum atendimento finalizado.'
                    }
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
