// Header.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './Header.css';

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <header className="header">
      <div className="logo">
        {/* Usando o novo ícone de CS */}
        <img src="/images/cs-icon.png" alt="CS Icon" className="logo-icon" />
        <h1>CS Lineups</h1>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Início</Link>
        {isAuthenticated ? (
          <>
            <span className="nav-link">Olá, {user.name}</span>
            <button
              onClick={() =>
                logout({ returnTo: window.location.origin })
              }
              className="nav-link login-btn"
            >
              Sair
            </button>
          </>
        ) : (
          <button onClick={loginWithRedirect} className="nav-link login-btn">Login</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
