import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../NavBar/NavBar";
import './LoginSingUp.css';



const LoginSingUp = () => {
    const { loginWithRedirect } = useAuth0();

    return(
        <div>
            <NavBar/>
            <div className="no-logueado-container">
            <h2>Inicia sesión o registrate para crear tus pokémons!</h2>
            <button className="no-logueado-btn" onClick={() => loginWithRedirect()}>Iniciar sesión</button>
            </div>
        </div>
    )
};


export default LoginSingUp;