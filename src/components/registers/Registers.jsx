import React, { Component } from 'react'

import './Registers.css'
import TicketWindow from './TicketWindow';

class Registers extends Component {

  state = {
    currentComponent: 'TicketWindow'
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
          {/* <select name="" id="" className="form-control">
            <option value="">Guichê</option>
            <option value="">Categoria de Atendimento</option>
            <option value="">Usuário</option>
            <option value="">Status de Atendimento</option>
          </select> */}
        </div>
        {/* <hr /> */}
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
