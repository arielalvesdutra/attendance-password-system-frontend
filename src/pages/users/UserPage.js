import React, { Component} from 'react'

import AbstractPage from '../AbstractPage'
import UsersList from '../../components/UsersList'
import AddUser from '../../components/AddUser'


class UserPage extends Component {

  render() {
    return (
      <AbstractPage articleTitle="Usuários">
        <div>
          <div>
            <AddUser />
            <UsersList history={this.props.history}/>
          </div>
        </div>
      </AbstractPage>
    )
  }
}

export default UserPage
