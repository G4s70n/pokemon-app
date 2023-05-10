import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.css' 


const NotFound = () => {
    return(
        <div className="not-found-container">
            <div className="logo-not-found">
                <span className='cuatro-not-found'>4</span>
                <img className="img-not-found" src="../../../public/not-found.webp" alt="logo" />
                <span className='cuatro-not-found'>4</span>
            </div>
            <span className="oh-no">¡Oh, no!</span>
            <span className='mensaje-not-found'>Has llegado a un callejón sin salida. La página que buscas no se puede encontrar.</span>
            <Link to="/home">
            <button className='button-not-found'>⟵ Regresar</button>
            </Link>
        </div>
    )
};

export default NotFound;