import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";
import { Auth0Provider } from "@auth0/auth0-react";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const domain =import.meta.env.VITE_AUTH0_DOMAIN;
const clientId =import.meta.env.VITE_AUTHO_CLIENT_ID;


ReactDOM.createRoot(document.getElementById("root")).render(

  <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{redirect_uri: window.location.origin}} >
   <Provider store={store}>
    <BrowserRouter>
    <ScrollToTop />
      <App />
      </BrowserRouter>
   </Provider>
  </Auth0Provider>
);
