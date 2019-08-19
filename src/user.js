const isAdmin = () => {

  const userStorage = JSON.parse(localStorage.getItem('__aps_data__'))

  const isAdmin = userStorage.payload.admin

  if (isAdmin) {
    return true
  }

  return false
}

const getUserId = () => {
  const userStorage = JSON.parse(localStorage.getItem('__aps_data__'))

  return  userStorage.payload.id
}

const getUserName = () => {
  const userStorage = JSON.parse(localStorage.getItem('__aps_data__'))

  return userStorage.payload.name
}

const getUserToken = () => {
  const userStorage = JSON.parse(localStorage.getItem('__aps_data__'))

  return userStorage.token
}

export {
  isAdmin,
  getUserId,
  getUserName,
  getUserToken
}
