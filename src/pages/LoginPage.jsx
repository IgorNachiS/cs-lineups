import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Entrar</h2>
        <button
          onClick={() => loginWithRedirect()}
          className="submit-btn"
        >
          Entrar com Auth0
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
