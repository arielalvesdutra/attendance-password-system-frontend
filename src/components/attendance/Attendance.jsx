import React, { Component } from 'react'
import { ClipLoader } from 'react-spinners'
import axios from 'axios'

import { backendUrl } from '../../backend'
import { getUserId } from '../../user'

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
    inProgressAttendance: null,
    loading: true,
    loadingSelectedTicketWindow: true,
    selectedTicketWindow: null,
    ticketWindow: []
  }

  attendPassword = () => {

    const userId = getUserId()
    const selectedTicketWindow = JSON.parse(localStorage.getItem('__selectedTicketWindow'))

    axios.patch(`${backendUrl}/attendance-passwords/actions/attend-password`, {
      userId: userId,
      ticketWindowId: selectedTicketWindow.id
    }).then(response => {
      if (response.status === 200) {

        this.setState({
          ...this.state,
          inProgressAttendance: response.data.id ? response.data : null
        })

        this.fetchAttendancePasswords()
      }
    })
      .catch(response => response)
  }

  componentWillMount = () => {

    this.fetchUserTicketWindow()
    this.fetchInProgressUserAttendance()
  }

  componentDidMount = () => {
    this.fetchAttendancePasswords()
    this.fetchTicketWindow()
  }

  cancelPassword = () => {

    const passwordId = this.state.inProgressAttendance.id

    axios.patch(`${backendUrl}/attendance-passwords/actions/${passwordId}/cancel-password`)
      .then(response => {
        if (response.status === 200) {
          this.fetchInProgressUserAttendance()
        }
      })
      .catch(response => response)
  }

  concludePassword = () => {
    const passwordId = this.state.inProgressAttendance.id

    axios.patch(`${backendUrl}/attendance-passwords/actions/${passwordId}/conclude-password`)
      .then(response => {
        if (response.status === 200) {
          this.fetchInProgressUserAttendance()
        }
      })
      .catch(response => response)
  }

  fetchAttendancePasswords = () => {
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

  fetchInProgressUserAttendance = () => {

    const userId = getUserId()

    axios.get(`${backendUrl}/attendance-passwords/users/${userId}/retrieve-in-progress`)
      .then(response => {
        if (response.status === 200 && response.data) {

          console.log(response.data)

          this.setState({
            ...this.state,
            inProgressAttendance: response.data.id ? response.data : null
          })
        }
      })
      .catch(response => response)
  }

  fetchUserTicketWindow = () => {
    const userId = getUserId()
    axios.get(`${backendUrl}/ticket-window-use/retrieve-user-ticket-window/${userId}`)
      .then(response => {

        const selecetedTicketWindow = response.data

        this.setState({
          ...this.state,
          selectedTicketWindow: selecetedTicketWindow,
          loadingSelectedTicketWindow: false
        })

        localStorage.setItem('__selectedTicketWindow', JSON.stringify(selecetedTicketWindow))
      })
      .catch(error => {

        this.setState({
          ...this.state,
          loadingSelectedTicketWindow: false
        })
        localStorage.removeItem('__selectedTicketWindow')
      })
  }

  fetchTicketWindow = () => {

    this.setState({
      ...this.state,
      selecetedTicketWindow: true
    })

    axios.get(`${backendUrl}/ticket-window-use/retrieve-unused-ticket-window`)
      .then(response => {
        this.setState({
          ...this.state,
          ticketWindow: response.data,
        })
      })
      .catch(error => {

        if (error.response && error.response.status === 404) {
          this.setState({
            ...this.state,
            ticketWindow: [],
          })
        }
      })

  }

  releaseTicketWindow = () => {

    const selectedTicketWindow = JSON.parse(localStorage.getItem('__selectedTicketWindow'))

    axios.post(`${backendUrl}/ticket-window-use/release`, {
      userId: getUserId(),
      ticketWindowId: selectedTicketWindow.id
    })
      .then(response => {
        if (response.status === 200) {

          this.setState({
            ...this.state,
            selectedTicketWindow: null
          })

          localStorage.removeItem('__selectedTicketWindow')

          this.fetchTicketWindow()
        }
      })
      .catch(error => error)
  }

  render() {

    console.log(this.state)

    return (
      <div className="Attendance">

        <div className="attendant-container">
          <div className="select-container">

            <h5>Guichê selecionado</h5>
            <hr />

            {this.state.loadingSelectedTicketWindow
              ? (<ClipLoader />)
              : (
                <div>
                  {this.state.selectedTicketWindow
                    ? (
                      <div className="selected-ticket-window-container">
                        <span>
                          {this.state.selectedTicketWindow.name}
                        </span>
                        <span>
                          <button onClick={this.releaseTicketWindow} disabled={this.state.inProgressAttendance} >
                            Liberar Guichê
                          </button>
                        </span>
                      </div>
                    )
                    : (
                      <div>
                        <div className="mt-4">
                          <span className="mr-4">
                            Favor selecionar um Guichê:
                          </span>
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
                    )}
                </div>
              )}
          </div>
          <div className="initiate-attend-container">
            <h5>Atendimento</h5>
            <hr />
            {this.state.inProgressAttendance
              ? (
                <div>
                  <div>Senha em atendimento: <strong>{this.state.inProgressAttendance.name}</strong></div>
                  <div className="mt-3">
                    <button className="mr-2" onClick={this.concludePassword} >
                      Concluir
                    </button>
                    <button className="mt-1"  onClick={this.cancelPassword} >
                      Cancelar
                    </button>
                  </div>

                </div>
              )
              : (
                <button disabled={!this.state.selectedTicketWindow}
                  onClick={this.attendPassword} >
                  Atender
            </button>
              )}
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


    axios.post(`${backendUrl}/ticket-window-use/use`, {
      userId: getUserId(),
      ticketWindowId: selectedTicketWindow.id
    })
      .then(response => {
        if (response.status === 200) {

          this.setState({
            ...this.state,
            selectedTicketWindow: selectedTicketWindow
          })

          localStorage.setItem('__selectedTicketWindow', JSON.stringify(selectedTicketWindow))
        }
      })
      .catch(error => error)
  }
}

export default Attendance
