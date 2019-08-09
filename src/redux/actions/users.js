import { SET_USERS } from './actionsTypes'


import axios from '../../axios'

export const fetchUsers = () => {
  return dispath => {
    axios.get('/users')
    .then(response => {
      const data = response.data

      dispath(setUsers(data))
    })
    .catch(error => error)
  }
}

export const setUsers = data => {
  return {
    type: SET_USERS,
    users: data
  }
}
