const isAdmin = () => {

  const userStorage = JSON.parse(localStorage.getItem('__aps_data__'))

  const isAdmin = userStorage.payload.admin

  if (isAdmin) {
    return true
  }

  return false
}

export {
  isAdmin
}