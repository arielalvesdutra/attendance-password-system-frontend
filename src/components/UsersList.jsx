import React, { Component } from 'react'
import { ClipLoader } from 'react-spinners'
import FormField from './FormField'
import FormButton from './FormButton'

import './UsersList.css'

import axios from 'axios'
import { backendUrl } from '../backend';

const UsersListHeader = () => (
  <div className="users-listing-header">
  <span>
    #ID
  </span>
  <span>
    #Nome
  </span>
  <span>
    #E-mail
  </span>
  <span>
    #Admin
  </span>
  <span>
    #Ações
  </span>
</div>
)

const UsersListLine = ({ id, name, email, admin, callback }) => (
  <div className="users-listing-line">
    <span>{id}</span>
    <span>{name}</span>
    <span>{email}</span>
    <span>{admin ? 'Sim' : 'Não' }</span>
    <span>
      <button className="btn-primary">
        Editar
      </button>
      <button className="btn-danger" onClick={() => callback(id)}>
        Remover
      </button>
    </span>
  </div>
)

class Users extends Component {

  state = {
    loading: true,
    users: []
  }

  componentDidMount = () => {
    this.fetchUsers()
  }

  createUser = event => {
    event.preventDefault()

    const data = new FormData(event.target)

    const name = data.get('name')
    const email = data.get('email')
    const password = data.get('password')
    const confirmPassword = data.get('confirm-password')

    console.log(name, email, password, confirmPassword)

    try {

      this.validateForm({ name, email, password, confirmPassword })

      axios.post(`${backendUrl}/users`, {
        name: name,
        email: email,
        password: password,
      })
      .then(response => {

        console.log(response)
        if (response.status === 201) {
          this.fetchUsers()
        }
      })
      .catch(error => console.log(error))

    } catch (error) {
    }
  }

  deleteUser = (id) => {
    axios.delete(`${backendUrl}/users/${id}`)
      .then(response => {
        if (response.status === 200) {
          this.fetchUsers()
        }
      })
      .catch(error => error)
  }

  fetchUsers = () => {
    this.setState({
      ...this.state,
      loading: true
    })

    axios.get(`${backendUrl}/users`)
      .then(response => {

        this.setState({
          ...this.state,
          users: response.data,
          loading: false
        })
      })
      .catch(error => {

        if (error.response.status === 404) {
          this.setState({
            ...this.state,
            users: [],
            loading: false
          })
        }
      })
  }

  render() {

    return (
      <div className="TicketWindow col-12">

        <div className="mt-1">
          <h5>Cadastro de Usuário</h5>
          <hr />
          <form onSubmit={this.createUser}>
            <div className="form-row ">
              <div className="col-12 col-md-6 mt-3">
                <FormField name="name" placeholder="Nome do Usuário" />
              </div>
              <div className="col-12 col-md-6 mt-3">
                <FormField name="email" placeholder="E-mail do Usuário" />
              </div>
            </div>
            <div className="form-row ">
              <div className="col-12 col-md-6 mt-3">
                <FormField name="password" placeholder="Senha da Usuário" type="password" />
              </div>
              <div className="col-12 col-md-6 mt-3">
                <FormField name="confirm-password" placeholder="Confirmação da senha do Usuário" type="password" />
              </div>
            </div>
            <div className="form-row mt-3">
              <div className="col-12">
                <FormButton text="Cadastrar" />
              </div>
            </div>
          </form>
        </div>
        <div className="mt-4">
          <h5>Listagem de Usuários</h5>
          <hr />
          <UsersListHeader />
          <div className="users-listing-body">
            {this.state.loading && !this.state.users.length
              ? (<ClipLoader />)
              : this.state.users.map((record, key) => (
                <UsersListLine 
                  id={record.id} 
                  name={record.name}
                  email={record.email} 
                  admin={record.admin} 
                  callback={this.deleteUser} 
                  key={key} />
              ))}
            {!this.state.loading && !this.state.users.length
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

    if (values.email <= 0) {
      throw Error('Campo email é obrigatório')
    }

    if (values.password <= 0) {
      throw Error('Campo senha é obrigatório')
    }

    if (values.confirmPassword <= 0) {
      throw Error('Campo confirmação de senha é obrigatório')
    }

    if (values.confirmPassword !== values.password) {
      throw Error('As senhas não conferem')
    }
  }
}

export default Users
