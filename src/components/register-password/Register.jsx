import React, { Component } from 'react'
import axios from 'axios'

import './Register.css'
import { backendUrl } from '../../backend'

export default class Register extends Component {

    state = {
        selectedCategory: null,
        categories: []
    }

    componentDidMount() {
        axios.get(`${backendUrl}/attendance-categories`)
            .then(response => {
                this.setState({
                    categories: response.data
                })
            })
    }

    confirmRegister = () => {
        
        axios.post(`${backendUrl}/attendance-passwords`, {
            categoryId: this.state.selectedCategory
        })

        this.setState({
            selectedCategory: null
        })

        console.log("Registrada uma nova senha.")
    }

    cancelRegister() {
        this.setState({
            selectedCategory: null
        })
    }

    selectCategory(idCategory) {
        this.setState({
            selectedCategory: idCategory
        })
    }

    render() {

        const categories = this.state.categories

        let content =
            this.state.selectedCategory === null
                ? (<div>
                    <h4>Selecione a categoria:</h4>
                    <div className="categories-container">
                    {
                      categories.map((categorie, key) => (
                        <button key={key} onClick={() => this.selectCategory(categorie.id)} className="category">
                          {categorie.name}
                        </button>
                      ))
                    }
                    </div>
                </div>)
                : (<div>
                    <h4>Confirmar cadastro:</h4>
                    <div className="confirm-register-container">
                        <button key="confirmButton" className="confirm-button"
                            onClick={this.confirmRegister}>
                            Confirmar
                      </button>

                        <button key="cancelButton" className="cancel-button"
                            onClick={() => this.cancelRegister()}>
                            Cancelar
                      </button>
                    </div>
                </div>)

        return (
            <div className="Register">
                {content}
            </div>
        )
    }
}