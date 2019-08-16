import { 
  LOADING_USERS,
  SET_USERS
} from './actionsTypes'

import axios from '../../axios'

export const createUser = user => {
  return dispatch => {
    dispatch(loadingUsers())

    axios.post('/users', {
      name: user.name,
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (response.status === 201) {

        dispatch(fetchUsers())
      }
    })
    .catch(error => error)
  }
}

export const deleteUser = id => {
  return dispatch => {
    
    dispatch(loadingUsers())

    axios.delete(`users/${id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchUsers())
      }
    })
    .catch(error => error)
  }
}

export const fetchUserById = userId => {
  return async dispatch => {
    return axios.get(`/users/${userId}`)
    .then(response => {

      return response.data
    })
    .catch(error => error)
  }
}

export const fetchUsers = () => {
  return dispatch => {

    dispatch(loadingUsers())

    axios.get('/users')
    .then(response => {
      const data = response.data

      dispatch(setUsers(data))
    })
    .catch(error => error)
  }
}

export const updateUser = user => {
  return dispatch => {
    axios.patch(`/users/${user.id}`, user)
    .then(response => {
      return response.data
    })
    .catch(error => console.log(error))
  }
}

export const loadingUsers = () => {
  return {
    type: LOADING_USERS
  }
}

export const setUsers = data => {
  return {
    type: SET_USERS,
    users: data
  }
}
