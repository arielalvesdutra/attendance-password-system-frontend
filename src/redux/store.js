import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

import passwordsReducer from './reducers/attendancePasswords'
import usersReducer from './reducers/users'
import passwordCategoriesReducer from './reducers/passwordCategories'

const reducers = combineReducers({
  users: usersReducer,
  passwords: passwordsReducer,
  passwordCategories: passwordCategoriesReducer
})

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig
