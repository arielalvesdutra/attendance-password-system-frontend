import React, { Component, Fragment } from 'react'
import { ClipLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import './EditUser.css'

import { 
  updateUser,
  updateUserAllowedPasswordCategories
} from '../redux/actions/users'
import { fetchPasswordCategories } from '../redux/actions/passwordCategories'

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
    this.handlePasswordCategoryChange = this.handlePasswordCategoryChange.bind(this)
  }

  componentWillMount = async () => {
    if (!this.props.user) {
      throw Error('É obrigatório fornecer um usuário por parâmetro')
    }

    this.setState({
      ...this.state,
      user: this.props.user
    })

    this.props.onFetchPasswordCategories()
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

  handlePasswordCategoryChange = passwordCategory => {
    
    const userCategories = this.state.user.allowedPasswordCategories

    if (passwordCategory.isChecked) {
      delete userCategories[passwordCategory.code]
    }

    if (!passwordCategory.isChecked) {
      userCategories[passwordCategory.code] = passwordCategory
    }

    this.setState({
      user: {
        ...this.state.user,
        allowedPasswordCategories: userCategories
      }
    })
  }

  handleUpdateUserSubmit = (event) => {
    event.preventDefault()

    this.props.onUpdateUser(this.state.user)
  }

  handleUpdateAllowedPassowordCategories = event => {
    event.preventDefault()

    this.props.onUpdateUserAllowedPasswordCategories(this.state.user)
  }

  userHasCategory = parameterCategoryCode => {

    const userCategories = Object.keys(this.state.user.allowedPasswordCategories)

    return userCategories.reduce((hasCategory, userCategoryCode) => {
      return hasCategory = userCategoryCode === parameterCategoryCode
         ? true
         : hasCategory
    }, false)
  }

  render() {
  
    const categoriesList = this.props.passwordCategories.isLoadingPasswordCategories === false
      ? this.props.passwordCategories.passwordCategories.map(record => {
          if (this.userHasCategory(record.code)) {
            record.isChecked = true
            return record
          }

          delete record.isChecked
          return  record
        })
      : []


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
            <h5 className="mt-4">Categorias de senha que o usuário atende</h5>
            <hr/>
            <form onSubmit={this.handleUpdateAllowedPassowordCategories}>
              {categoriesList.length > 0 && (
                categoriesList.map((passwordCategory, key) => 

                  <div className="form-check" key={key}>
                    <input className="form-check-input" 
                            onChange={() => this.handlePasswordCategoryChange(passwordCategory)}
                            defaultChecked={passwordCategory.isChecked ? 'checked' : ''}
                            type="checkbox"/>
                    <label className="form-check-label">
                    { passwordCategory.name }
                    </label>
                  </div>          
              ))}
              {this.props.passwordCategories.isLoadingPasswordCategories === true &&
                <ClipLoader />
              }
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
    onUpdateUser: user => dispatch(updateUser(user)),
    onUpdateUserAllowedPasswordCategories: user => 
        dispatch(updateUserAllowedPasswordCategories(user)),
    onFetchPasswordCategories: () => dispatch(fetchPasswordCategories())
   }
}

const mapStateToProps = ({ passwordCategories }) => {
  return { 
    passwordCategories 
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(EditUser)
