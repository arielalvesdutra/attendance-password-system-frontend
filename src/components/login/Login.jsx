import React, { Component } from 'react'
import axios from 'axios'

import ErrorField from '../ErrorField'
import FormField from '../FormField'
import FormButton from '../FormButton'
import { backendUrl } from '../../backend'
import './Login.css'

export default class Login extends Component {

  state = {
    errors: {
      email: null,
      password: null,
      requestError: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const data = new FormData(event.target)
    const email = data.get('email')
    const password = data.get('password')

    try {
      this.validateForm({ email, password })

      this.signin({ email, password })

    } catch (error) {
    }
  }

  signin = (parameters) => {

    axios.post(`${backendUrl}/signin`, {
      email: parameters.email,
      password: parameters.password
    })
      .then(response => {
        localStorage.setItem('__aps_data__', JSON.stringify(response.data))

        this.redirectToLoggedHomePage()
      })
      .catch(error => {
        const errorMessage = error.response.data
        localStorage.removeItem('___aps_data__')

        this.setState({
          ...this.state,
          errors: {
            requestError: errorMessage
          }
        })
      })
  }

  validateForm = values => {
    let errors = {}

    if (values.email.length <= 0) {
      errors.email = 'É necessário preencher o e-mail'
    }

    if (values.password.length <= 0) {
      errors.password = 'É necessário preencher a senha'
    }

    this.setState({
      ...this.state,
      errors: errors
    })

    if (Object.keys(errors).length) {
      throw errors
    }
  }

  redirectToLoggedHomePage = () => {
    window.location.href = '/'
  }

  render() {

    return (
      <div className="Login">
        <div className="login-container col-12 col-sm-12 col-md-6">
          <form onSubmit={this.handleSubmit}>
            <FormField type="text" placeholder="Digite o seu e-mail" name="email" />
            <ErrorField message={this.state.errors.email} />
            
            <FormField type="password" placeholder="Digite a sua senha"
              name="password" mt="mt-3" />
            <ErrorField message={this.state.errors.password} />

            <FormButton type="submit" text="Logar" />
          </form>
            <ErrorField message={this.state.errors.requestError} />
        </div>
      </div>
    )
  }
}
