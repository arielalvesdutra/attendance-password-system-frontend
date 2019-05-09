import React, { Component } from 'react'

import './Registers.css'
import TicketWindow from './TicketWindow';
import PasswordCategories from './PasswordCategories';
import Users from './Users';

class Registers extends Component {

  state = {
    currentComponent: 'PasswordCategories'
  }

  setComponentToShow(componentName) {

    this.setState({
      currentComponent: componentName
    })
  }

  getComponentToShow() {

    const currentComponent = this.state.currentComponent

    if (currentComponent === 'TicketWindow') {
      return <TicketWindow />
    }

    if (currentComponent === 'PasswordCategories') {
      return <PasswordCategories />
    }

    if (currentComponent === 'Users') {
      return <Users />
    }
  }

  render() {

    return (
      <div>
        <div>
          <h4>Selecione o item para gerenciar:</h4>
          <br/>
          <button className="registers-menu-button mt-2"
            onClick={() => this.setComponentToShow("PasswordCategories")}>
            Categorias de Senhas
          </button>
          <button className="registers-menu-button mt-2"
            onClick={() => this.setComponentToShow("TicketWindow")}>
            Guichês
          </button>
          <button className="registers-menu-button mt-2"
            onClick={() => this.setComponentToShow("Users")}>
            Usuários
          </button>
        </div>
    
        <div className="registers-content">
          {
            this.getComponentToShow()
          }
        </div>
      </div>
    )
  }
}

export default Registers
