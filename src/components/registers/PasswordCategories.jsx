import React, { Component } from 'react'
import { ClipLoader } from 'react-spinners'

import FormField from '../FormField'
import FormButton from '../FormButton'

import './PasswordCategories.css'

import axios from 'axios'
import { backendUrl } from '../../backend';

const PasswordCategoriesListHeader = () => (
  <div className="password-categories-listing-header">
    <span>
      #ID
    </span>
    <span>
      #Nome
    </span>
    <span>
      #Código
    </span>
    <span>
      #Ações
    </span>
  </div>
)

const PasswordCategoriesListLine = ({ id, name, code, callback }) => (
  <div className="password-categories-listing-line">
    <span>{id}</span>
    <span>{name}</span>
    <span>{code}</span>
    <span>
      <button onClick={() => callback(id)}>
        Remover
      </button>
    </span>
  </div>
)

class PasswordCategories extends Component {

  state = {
    loading: true,
    passwordCategories: []
  }

  componentDidMount = () => {
    this.fetchPasswordCategories()
  }

  createPasswordCategory = event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const name = formData.get('name')
    const code = formData.get('code')

    try {

      this.validadeForm({ name, code })

      axios.post(`${backendUrl}/attendance-categories`, {
        name: name,
        code: code
      })
        .then(response => {
          if (response.status === 201) {
            this.fetchPasswordCategories()
          }
        })
        .catch(error => error)

    } catch (error) {

    }
  }

  deletePasswordCategory = (id) => {
    axios.delete(`${backendUrl}/attendance-categories/${id}`)
      .then(response => {
        if (response.status === 200) {
          this.fetchPasswordCategories()
        }
      })
      .catch(error => error)
  }

  fetchPasswordCategories = () => {
    this.setState({
      ...this.state,
      loading: true
    })

    axios.get(`${backendUrl}/attendance-categories`)
      .then(response => {

        this.setState({
          ...this.state,
          passwordCategories: response.data,
          loading: false
        })
      })
      .catch(error => {

        if (error.response.status === 404) {
          this.setState({
            ...this.state,
            passwordCategories: [],
            loading: false
          })
        }
      })
  }

  render() {

    return (
      <div className="TicketWindow col-12 col-md-10">

        <div className="mt-1">
          <h5>Cadastro de Categoria</h5>
          <hr />
          <form onSubmit={this.createPasswordCategory}>
            <div className="form-row ">
              <div className="col-12 col-md-6 mt-3">
                <FormField name="name" placeholder="Nome da Categoria" />
              </div>
              <div className="col-12 col-md-6 mt-3">
                <FormField name="code" placeholder="Código da Categoria" />
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
          <h5>Listagem de Categorias</h5>
          <hr />
          <PasswordCategoriesListHeader />
          <div className="password-categories-listing-body">
            {this.state.loading && !this.state.passwordCategories.length
              ? (<ClipLoader />)
              : this.state.passwordCategories.map((record, key) => (
                <PasswordCategoriesListLine 
                  name={record.name}
                  callback={this.deletePasswordCategory} 
                  code={record.code} id={record.id} key={key} />
              ))}
            {!this.state.loading && !this.state.passwordCategories.length
              ? (<div className="mt-4">Nenhum registro encontrado</div>)
              : ''
            }
          </div>
        </div>
      </div>
    )
  }

  validadeForm = (values) => {
    if (values.name <= 0) {
      throw Error('Campo nome é obrigatório')
    }

    if (values.code <= 0) {
      throw Error('Campo código é obrigatório')
    }
  }
}

export default PasswordCategories
