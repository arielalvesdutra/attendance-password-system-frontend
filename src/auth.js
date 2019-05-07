
const isLogged = () => {
  if (localStorage.getItem('__aps_data__')) {
    return true
  }

  return false
}

const logOut = () => {
  localStorage.removeItem('__aps_data__')

  window.location.href = '/login'
}

export {
  isLogged,
  logOut
}