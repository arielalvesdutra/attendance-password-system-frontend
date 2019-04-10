import React from 'react'

import './Footer.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default props =>
    <footer className="Footer ">
        @arielalvesdutra - 
        <span className="ml-2">
            <a href="https://github.com/arielalvesdutra">
             <FontAwesomeIcon icon={faGithub} size="x" /> 
            </a>
        </span>
    </footer>