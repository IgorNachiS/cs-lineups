import React from "react";
import { Link } from "react-router-dom";
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-form-container">
        <h2>Cadastrar-se</h2>
        <form className="register-form">
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input type="text" id="username" placeholder="Digite seu nome de usuário" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Digite seu email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input type="password" id="confirmPassword" placeholder="Confirme sua senha" />
          </div>
          <button type="submit" className="submit-btn">Cadastrar</button>
        </form>
        <Link to="/login" className="back-btn">Já tem uma conta? Entrar</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
