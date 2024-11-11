import React from "react";
import { Link } from "react-router-dom";
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Entrar</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input type="text" id="username" placeholder="Digite seu nome de usuário" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" />
          </div>
          <button type="submit" className="submit-btn">Entrar</button>
        </form>
        <Link to="/register" className="register-link">Não tem uma conta? Cadastre-se</Link>
      </div>
    </div>
  );
};

export default LoginPage;
