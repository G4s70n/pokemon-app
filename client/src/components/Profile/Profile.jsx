import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import './Profile.css'; 

const Profile = () => {
    const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

    return(
        isAuthenticated && user ?(
        <div class='profile-container'>
                    <span>{user.name}</span>
                    <i class="fa-solid fa-user"></i>
                    <button onClick={() => logout()} class="button-salir">Salir</button>
        </div>
        ):(
            <div class='container-buttons'>
                <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
                <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>Registrarse</button>
            </div>
        )
    )
};


export default Profile;