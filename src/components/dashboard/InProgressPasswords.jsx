import React, { Component } from 'react'
import { connect } from 'react-redux'

import './styles.css'
import { fetchInProgressPasswords } from '../../redux/actions/attendancePasswords'

class InProgressPasswords extends Component {

     componentDidMount() {
          this.props.onFetchInProgressPasswords()

          const interval = 10000

          setInterval(() => {
               this.props.onFetchInProgressPasswords()
          },
               interval
          )
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

const mapStateToProps = ({ passwords }) => {

     const inProgressPasswords = passwords.inProgressPasswords

     return {
          inProgressPasswords
     }
}

const mapDispatchToProps = dispatch => {

     return {
          onFetchInProgressPasswords: () => dispatch(fetchInProgressPasswords())
     }
}

export default connect(
     mapStateToProps, mapDispatchToProps
)(InProgressPasswords)
