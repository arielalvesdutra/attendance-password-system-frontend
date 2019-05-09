import React, { Component } from 'react'

import './Registers.css'
import TicketWindow from './TicketWindow';
import PasswordCategories from './PasswordCategories';

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
  }

  render() {

    return (
      <div>
        <div>
          <h4>Selecione o item para gerenciar:</h4>
          <br/>
          <button className="registers-menu-button"
            onClick={() => this.setComponentToShow("TicketWindow")}>
            Guichês
          </button>

          <button className="registers-menu-button"
            onClick={() => this.setComponentToShow("PasswordCategories")}>
            Categorias de Senhas
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
