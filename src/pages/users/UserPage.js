import React, { Component} from 'react'

import AdminLayout from '../templates/SystemLayout'
import UsersList from '../../components/ListUsers'
import AddUser from '../../components/AddUser'


class UserPage extends Component {

  render() {
    return (
      <AdminLayout articleTitle="Usuários">
        <div>
          <div>
            <AddUser />
            <UsersList history={this.props.history}/>
          </div>
        </div>
      </AdminLayout>
    )
  }
}

export default UserPage
