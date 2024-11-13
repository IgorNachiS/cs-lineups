import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h2>Cadastrar-se</h2>
        <button
          onClick={() =>
            loginWithRedirect({
              screen_hint: "signup",
            })
          }
          className="submit-btn"
        >
          Cadastrar com Auth0
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;

