import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Counter Strike Lineups</h1>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Início</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
