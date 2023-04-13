import React from 'react';
import {Link} from 'react-router-dom';
import "./Footer.css"


const Footer = () => {
    return(
        <footer>
            <p>Hecho por Gastón Nieto 💻😃</p>
            <Link to='about'>
            <a>Contacto</a>
            </Link>
        </footer>
    )
};

export default Footer;