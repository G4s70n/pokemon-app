import React from 'react';
import { Link } from "react-router-dom";
import './NotFound.css' 


const NotFound = () => {
    return(
        <div>
            <span>4</span>
            <img src="../../../public/not-found.webp" alt="logo" />
            <span>4</span>
            <span>¡Oh no!</span>
            <span>Has llegado a un callejón sin salida. La página que buscas no se puede encontrar.</span>
            <Link to="/home">
            <button className='button'>Regresar</button>
            </Link>
        </div>
    )
};

export default NotFound;