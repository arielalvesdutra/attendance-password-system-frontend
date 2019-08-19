import {
  LOADING_USERS,
  SET_USERS
} from '../actions/actionsTypes'

let initialState = {
  isLoadingUsers: true,
  users: []
}

export default (state = initialState, action) => {

  switch(action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
        isLoadingUsers: false
      }
    }
    case LOADING_USERS: {
      return {
        ...state,
        isLoadingUsers: true
      }
    }
    default:
      return state
  }
}
