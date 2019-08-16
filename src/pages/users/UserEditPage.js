import React, { Component} from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'

import AbstractPage from '../AbstractPage'
import EditUser from '../../components/EditUser'

import { fetchUserById } from '../../redux/actions/users'

class UserPage extends Component {

  state = {
    user: {}
  }

  constructor(props) {
    super(props)

    if (!props.match.params.id) {
      throw Error('É obrigatório o ID de usuário')
    }
  }

  componentWillMount = async () => {
    const user = await this.props.onFetchUserById(this.props.match.params.id)
    
    user.id 
      ? this.setState({ ...this.state, user: user})
      : this.props.history.push('/not-found')
  }

  render() {
    
    return (
      <AbstractPage articleTitle="Editar usuário">
        {this.state.user.id
          ? <EditUser user={this.state.user}/>
          : <ClipLoader />
        }
      </AbstractPage>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserById: id => dispatch(fetchUserById(id))
  }
}

export default connect(
  null, mapDispatchToProps
)(UserPage)
