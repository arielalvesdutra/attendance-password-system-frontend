import React, { Component} from 'react'

import AbstractPage from '../AbstractPage'
import UsersList from '../../components/UsersList'


class UserPage extends Component {


  render() {
    
    return (
      <AbstractPage articleTitle="Usuários">
        <div>
          <div>
            <UsersList />
          </div>
        </div>
      </AbstractPage>
    )
  }
}

export default UserPage
