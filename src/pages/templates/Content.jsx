import React from 'react'

import './Content.css'

export default props =>
    <div className="Content">
        <div className="Content-container col-12 col-md-10 col-sm-10">

            <h3>
                { props.title || 'Título do artigo' }
            </h3>
            <hr />
            {props.children}
        </div>
    </div>