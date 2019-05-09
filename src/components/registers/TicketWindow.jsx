import React, { Component } from 'react'
import { ClipLoader } from 'react-spinners'

import FormField from '../FormField'
import FormButton from '../FormButton'

import './TicketWindow.css'

import axios from 'axios'
import { backendUrl } from '../../backend';

const TicketWindowListLine = ({ id, name, callback }) => (
  <div className="ticket-window-listing-line">
    <span>{id}</span>
    <span>{name}</span>
    <span>
      <button onClick={() => callback(id)}>
        Remover
      </button>
    </span>
  </div>
)

const TicketWindowListHeader = () => (
  <div className="ticket-window-listing-header">
    <span>
      #ID
  </span>
    <span>
      #Nome
  </span>
    <span>
      #Ações
  </span>
  </div>
)

class TicketWindow extends Component {

  state = {
    loading: true,
    ticketWindow: []
  }

  componentDidMount = () => {
    this.fetchTicketWindow()
  }

  createTicketWindow = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const name = formData.get('name')

    try {
      this.validateForm({ name })

      axios.post(`${backendUrl}/ticket-window`, {
        name: name
      })
        .then(response => {
          if (response.status === 201) {
            this.fetchTicketWindow()
          }
        })
        .catch(error => error)

    } catch (error) {
    
    }
  }

  deleteTicketWindow = (id) => {
    axios.delete(`${backendUrl}/ticket-window/${id}`)
      .then(response => {
        if (response.status === 200) {
          this.fetchTicketWindow()
        }
      })
      .catch(error => error)
  }

  fetchTicketWindow = () => {

    this.setState({
      ...this.state,
      loading: true
    })

    axios.get(`${backendUrl}/ticket-window`)
      .then(response => {

        this.setState({
          ...this.state,
          ticketWindow: response.data,
          loading: false
        })
      })
      .catch(error => {

        if (error.response.status === 404) {
          this.setState({
            ...this.state,
            ticketWindow: [],
            loading: false
          })
        }
      })
  }

  render() {

    return (
      <div className="TicketWindow col-12 col-md-10">

        <div className="mt-1">
          <h5>Cadastro de Guichê</h5>
          <hr />
          <form onSubmit={this.createTicketWindow}>
            <div className="form-row ">
              <div className="col-12 col-md-6 mt-3">
                <FormField name="name" placeholder="Nome do Guichê" />
              </div>
              <div className="col-12 col-md-6 mt-3">
                <FormButton text="Cadastrar" />
              </div>
            </div>
          </form>
        </div>

        <div className="mt-4">
          <h5>Listagem de Guichês</h5>
          <hr />
          <TicketWindowListHeader />
          <div className="ticket-window-listing-body">
            {this.state.loading && !this.state.ticketWindow.length
              ? (<ClipLoader />)
              : this.state.ticketWindow.map((record, key) => (
                <TicketWindowListLine name={record.name}
                  callback={this.deleteTicketWindow} id={record.id} key={key} />
              ))}
            {!this.state.loading && !this.state.ticketWindow.length
              ? (<div className="mt-4">Nenhum registro encontrado</div>)
              : ''
            }
          </div>
        </div>

      </div>
    )
  }

  validateForm = values => {
    if (values.name <= 0) {
      throw Error('Campo nome é obrigatório')
    }
  }
}

export default TicketWindow
