
const isLogged = () => {
  if (localStorage.getItem('__aps_data__')) {
    return true
  }

  return false
}

export {
  isLogged
}