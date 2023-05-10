import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./Profile.css";
import {BiUserCircle} from 'react-icons/bi';
import {IoMdLogIn} from 'react-icons/io';
import {AiOutlineUserAdd} from 'react-icons/ai';


const Profile = () => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  return isAuthenticated && user ? (
    <div className="profile-container">
      <div> <BiUserCircle className="icon-user-navBar"/> </div>
      <span className="name-span">{user.name}</span>
      <button onClick={() => logout()} className="button-salir">
        Salir
      </button>
    </div>
  ) : (
    <div className="container-buttons">
      <div className="profile-icon-button">
        <div className="icon-login-1-navBar"> <IoMdLogIn /> </div>
        <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
      </div>
      <div className="profile-icon-button">
        <div className="icon-sing-up-narBar"> <AiOutlineUserAdd /> </div>
        <button onClick={() => loginWithRedirect({ screen_hint: "signup" })}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default Profile;
