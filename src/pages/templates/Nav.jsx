import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './Nav.css'
import { isAdmin } from '../../user'

class Nav extends Component {

    state = {
        showMobileMenu: false
    }

    toggleMobileMenuVisibility = () => {
        this.setState({
            showMobileMenu: !this.state.showMobileMenu
        })
    }

    render() {
        const pathname = window.location.pathname

        return (
            <nav className="Nav">
                <ul className="nav-desktop">
                    <li className="">
                        <Link to="/" className={`${pathname === '/' ? 'active' : ''}`}>
                            Realizar atendimento
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/register-password" className={`${pathname === '/register-password' ? 'active' : ''}`}>
                            Cadastrar senha
                        </Link>
                    </li>

                    {isAdmin()
                        ? (<li className="">
                            <Link to="/registers" className={`${pathname === '/registers' ? 'active' : ''}`}>
                                Cadastros
                            </Link>
                        </li>
                        )
                        : ''
                    }
                    <li className="">
                        <Link to="/dashboard" className={`${pathname === '/dashboard' ? 'active' : ''}`}>
                            Dashboard
                        </Link>
                    </li>
                </ul>
                <ul className="nav-mobile">
                    <li className="">
                        <button onClick={this.toggleMobileMenuVisibility}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </li>
                    {this.state.showMobileMenu
                        ? (
                            <span>
                                <li className="">
                                    <Link to="/" className={` ${pathname === '/' ? 'active' : ''}`}>
                                        Realizar atendimento
                                    </Link>
                                </li>
                                <li className="">
                                    <Link to="/register-password" className={` ${pathname === '/register-password' ? 'active' : ''}`}>
                                        Cadastrar senha
                                    </Link>
                                </li>
                                {isAdmin() 
                                    ? (
                                    <li className="">
                                        <Link to="/registers" className={`${pathname === '/registers' ? 'active' : ''}`}>
                                        Cadastros
                                        </Link>
                                    </li>)
                                    : ''}
                                <li className="">
                                    <Link to="/dashboard" className={` ${pathname === '/dashboard' ? 'active' : ''}`}>
                                        Dashboard
                                    </Link>
                                </li>
                            </span>
                        )
                        : ''
                    }
                </ul>
            </nav>
        )
    }
}

export default Nav