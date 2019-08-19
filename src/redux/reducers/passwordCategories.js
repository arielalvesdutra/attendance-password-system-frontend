import {
  LOADING_PASSWORD_CATEGORIES,
  SET_PASSWORD_CATEGORIES
} from '../actions/actionsTypes'

let initialState = {
  isLoadingPasswordCategories: true,
  passwordCategories: []
}

export default (state = initialState, action) => {

  switch(action.type) {
    case SET_PASSWORD_CATEGORIES: {
      return {
        ...state,
        passwordCategories: action.passwordCategories,
        isLoadingPasswordCategories: false
      }
    }
    case LOADING_PASSWORD_CATEGORIES: {
      return {
        ...state,
        isLoadingPasswordCategories: true
      }
    }
    default:
      return state
  }
}
