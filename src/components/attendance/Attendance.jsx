import React, { Component } from 'react'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'

import { backendUrl } from '../../backend'

import './Attendance.css'


const AttendancePasswordsList = ({ name, statusName, ticketWindow }) => (
  <div className="attendance-passwords-listing">
    <span>{name}</span>
    <span>{statusName}</span>
    <span>{ticketWindow ? ticketWindow.name : 'Nenhum Guichê selecionado'}</span>
  </div>
)

class Attendance extends Component {

  state = {
    attendancePasswords: [],
    loading: true,
    selectedTicketWindow: null,
    ticketWindow: []
  }

  componentWillMount = () => {
    const selecetedTicketWindow = JSON.parse(localStorage.getItem('__selectedTicketWindow'))

    if (selecetedTicketWindow) {
      this.setState({
        ...this.state,
        selectedTicketWindow: selecetedTicketWindow
      })
    }
  }

  componentDidMount = () => {
    this.fetchAttendancaPasswords()
    this.fetchTicketWindow()
  }

  fetchAttendancaPasswords = () => {
    this.setState({
      ...this.state,
      loading: true
    })

    axios.get(`${backendUrl}/attendance-passwords/search/retrieve-awaiting`)
      .then(response => {

        this.setState({
          ...this.state,
          attendancePasswords: response.data,
          loading: false
        })
      })
      .catch(error => {

        if (error.response.status === 404) {
          this.setState({
            ...this.state,
            attendancePasswords: [],
            loading: false
          })
        }
      })
  }

  fetchTicketWindow = () => {

    axios.get(`${backendUrl}/ticket-window`)
      .then(response => {

        this.setState({
          ...this.state,
          ticketWindow: response.data,
        })
      })
      .catch(error => {

        if (error.response.status === 404) {
          this.setState({
            ...this.state,
            ticketWindow: [],
          })
        }
      })

  }

  render() {

    return (
      <div>

        <div>
          <h5>Guichê selecionado</h5>
          <hr />
          <div>
            {this.state.selectedTicketWindow
              ? (<div>{this.state.selectedTicketWindow.name}</div>)
              : (
                <div>
                  <div>Favor selecionar um Guichê:</div>
                  <div className="mt-2">
                    <select name="" id="" onChange={this.selectTicketWindow}>
                      <option value="">Selecione o Guichê...</option>
                      {this.state.ticketWindow
                        ? this.state.ticketWindow.map((record, key) => (
                          <option key={key} value={record.id} >
                            {record.name}
                          </option>
                        ))
                        : ''
                      }
                    </select>
                  </div>

                </div>
              )

            }
          </div>
        </div>
        <div className="mt-4">
          <h5>Atendimentos</h5>
          <hr />
          {this.state.attendancePasswords.length && !this.state.loading
            ? this.state.attendancePasswords.map((attendancePassword, key) => (
              <AttendancePasswordsList
                name={attendancePassword.name}
                statusName={attendancePassword.status.name}
                ticketWindow={attendancePassword.ticketWindow}
                key={key} />
            ))
            : (<ClipLoader />)
          }
        </div>
      </div>
    )
  }

  selectTicketWindow = event => {

    const selectedOption = event.target.value

    const sameId = record => record.id === parseInt(selectedOption)

    const selectedTicketWindow = this.state.ticketWindow.filter(sameId).shift()

    this.setState({
      ...this.state,
      selectedTicketWindow: selectedTicketWindow
    })

    localStorage.setItem('__selectedTicketWindow', JSON.stringify(selectedTicketWindow))
  }
}

export default Attendance