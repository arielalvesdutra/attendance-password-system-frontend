import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import './styles.css'
import { addInProgressPasswords } from '../../redux/actions/attendancePasswords'
import { backendUrl } from '../../backend'

class InProgressPasswords extends Component {

     constructor(props) {
          super(props)
          this.fetchInProgressPasswords()
     }

     componentDidMount() {
          this.fetchInProgressPasswords()
          const interval = 10000

          setInterval(() => {
               this.fetchInProgressPasswords()
          },
               interval
          )
     }

     fetchInProgressPasswords = () => {
          axios.get(
               `${backendUrl}/attendance-passwords/search/retrieve-in-progress`)
               .then(response => {
                    this.props.addInProgressPasswords(response.data)
               })
     }

     render() {

          const passwords = this.props.inProgressPasswords

          return (
               <div className="in-progress shared">
                    <h4>Senhas em atendimento</h4>
                    <hr />
                    {
                      passwords && passwords.length
                         ? passwords.map((password, key) => (
                              <div key={key} className="form-row line">
                                   {password.name} - {password.ticketWindow.name}
                              </div>
                          )
                         )
                         : 'Nenhum atendimento em andamento.'
                    }
               </div>
          )
     }
}

const mapStateToProps = ({ inProgressPasswords }) => {

     return {
          inProgressPasswords
     }
}

const mapDispatchToProps = dispatch => {
     return {
          addInProgressPasswords: passwords => dispatch(addInProgressPasswords(passwords))
     }
}

export default connect(
     mapStateToProps, mapDispatchToProps
)(InProgressPasswords)
