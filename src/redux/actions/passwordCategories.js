import { 
  LOADING_PASSWORD_CATEGORIES, 
  SET_PASSWORD_CATEGORIES 
} from './actionsTypes'
import axios from '../../axios'

export const fetchPasswordCategories = () => {
  return dispatch => {
    dispatch(loadingPasswordCategories())

    axios.get('/attendance-categories')
    .then(response => {
      const data = response.data

      dispatch(setPasswordCategories(data))
    })
    .catch(error => error)
  }
}

export const loadingPasswordCategories = () => {
  return {
    type: LOADING_PASSWORD_CATEGORIES
  }
}

export const setPasswordCategories = passwordCategories => {
  return {
    type: SET_PASSWORD_CATEGORIES,
    passwordCategories: passwordCategories
  }
}
