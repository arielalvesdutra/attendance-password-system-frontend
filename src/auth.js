
const isLogged = () => {
  if (localStorage.getItem('__aps_data__')) {
    return true
  }

  return false
}

const logOut = () => {
  localStorage.removeItem('__aps_data__')
  localStorage.removeItem('__selectedTicketWindow')

  window.location.href = '/login'
}

export {
  isLogged,
  logOut
}