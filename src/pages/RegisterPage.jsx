import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import { useAuth0 } from "@auth0/auth0-react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  const { loginWithRedirect } = useAuth0();

  const handleBackClick = () => {
    navigate("/"); // Redireciona para a página inicial
  };

  // Detecta quando o usuário pressiona o botão de "voltar" no navegador
  useEffect(() => {
    const handlePopState = () => {
      navigate("/"); // Redireciona para a página inicial
    };

    window.addEventListener("popstate", handlePopState);

    // Limpa o event listener quando o componente for desmontado
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

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

        {/* Botão de Voltar para a página inicial */}
        <button onClick={handleBackClick} className="back-btn">
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
