import { 
  LOADING_USERS,
  SET_USERS
} from './actionsTypes'


import axios from '../../axios'

export const fetchUsers = () => {
  return dispath => {

    dispath(loadingUsers())

    axios.get('/users')
    .then(response => {
      const data = response.data

      dispath(setUsers(data))
    })
    .catch(error => error)
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
