import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { updateUser } from '../redux/actions/users'

import './EditUser.css'

class EditUser extends Component {

  state = {
    user: {
      name: '',
      admin: false
    }
  }

  constructor(props) {
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleAdminChange = this.handleAdminChange.bind(this)
  }

  componentWillMount = async () => {
    if (!this.props.user) {
      throw Error('É obrigatório fornecer um usuário por parâmetro')
    }

    this.setState({
      ...this.state,
      user: this.props.user
    })
  }

  back = () => {
    window.history.go(-1)
  }

  handleNameChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        name: event.target.value
      }
    })
  }

  handleAdminChange = event => {
    this.setState({
      user: {
        ...this.state.user,
        admin: event.target.checked
      }
    })
  }

  handleUpdateUserSubmit = (event) => {
    event.preventDefault()

    this.props.onUpdateUser(this.state.user)
  }

  render() {
    
    return (
      <div className="EditUser col-12">
        
        {this.state.user.id != null && (
          <Fragment>

            <h5>
              <a onClick={this.back} title="Voltar">
               <FontAwesomeIcon icon={faArrowLeft} /> 
              </a>
               Editar usuário
            </h5>
            <hr />
            <form onSubmit={this.handleUpdateUserSubmit}> 

              <div className="form-group">
                <label >Nome</label>
                <input type="text" 
                      className="form-control" 
                      onChange={this.handleNameChange}
                      value={this.state.user.name}
                      placeholder="Digite o nome do usuário"/>
              </div>

              <div className="form-group">
                <label >E-mail</label>
                <input type="email" 
                        className="form-control" 
                        defaultValue={this.state.user.email}
                        disabled placeholder="name@example.com"/>
              </div>
              <div className="form-check">
                <input className="form-check-input" 
                        onChange={this.handleAdminChange}
                        defaultChecked={this.state.user.admin ? 'checked' : ''}
                        type="checkbox"/>
                <label className="form-check-label">
                  Usuário é Admin?
                </label>
              </div>
              <button type="submit" className="btn btn-primary mt-4 form-control">
                Salvar
              </button>
            </form>
          </Fragment>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateUser: user => dispatch(updateUser(user))
   }
}

const mapStateToProps = () => {
  return { }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(EditUser)
