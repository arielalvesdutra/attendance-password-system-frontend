import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'

import './ListUsers.css'

import { deleteUser, fetchUsers } from '../redux/actions/users'

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

const UsersListLine = ({ id, name, email, admin, onDelete, onEdit }) => (
  <div className="users-listing-line">
    <span>{id}</span>
    <span>{name}</span>
    <span>{email}</span>
    <span>{admin ? 'Sim' : 'Não' }</span>
    <span>
      <button className="btn-primary" onClick={() => onEdit(id) }>
        Editar
      </button>
      <button className="btn-danger" onClick={() => onDelete(id)}>
        Remover
      </button>
    </span>
  </div>
)

class UsersList extends Component {

  componentDidMount = () => {
    this.props.onFetchUsers()
  }

  redirectToUserEdit = userId => {
    this.props.history.push(`/users/${userId}/edit`);
  }

  render() {

    return (
      <div className="col-12">
        <div className="mt-4">
          <h5>Listagem de Usuários</h5>
          <hr />
          <UsersListHeader />
          <div className="users-listing-body">
            {this.props.users.isLoadingUsers && !this.props.users.users.length
              ? (<ClipLoader />)
              : this.props.users.users.map((record, key) => (
                <UsersListLine 
                  id={record.id} 
                  name={record.name}
                  email={record.email} 
                  admin={record.admin} 
                  onDelete={this.props.onDeleteUser} 
                  onEdit={this.redirectToUserEdit}
                  key={key} />
              ))}
            {!this.props.users.isLoadingUsers && !this.props.users.users.length
              ? (<div className="mt-4">Nenhum registro encontrado</div>)
              : ''
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: () => dispatch(fetchUsers()),
    onDeleteUser: id => dispatch(deleteUser(id)),
  }
}

const mapStateToProps = ({ users}) => {
  return {
    users
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(UsersList)
