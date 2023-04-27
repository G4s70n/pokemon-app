import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";

const Profile = () => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  console.log(user);
  return isAuthenticated && user ? (
    <div className="profile-container">
      <i className="fa-solid fa-user"></i>
      <span>{user.name}</span>
      <button onClick={() => logout()} className="button-salir">
        Salir
      </button>
    </div>
  ) : (
    <div className="container-buttons">
      <div className="profile-icon-button">
        <i className="fa-sharp fa-solid fa-right-to-bracket"></i>
        <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
      </div>
      <div className="profile-icon-button">
        <i className="fa-regular fa-user"></i>
        <button onClick={() => loginWithRedirect({ screen_hint: "signup" })}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Profile;
