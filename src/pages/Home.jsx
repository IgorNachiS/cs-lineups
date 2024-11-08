import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

const maps = ["Mirage", "Dust2", "Inferno", "Nuke", "Overpass"];

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Bem-vindo ao Counter Strike Lineups</h1>
        <p>Encontre as melhores lineups para dominar o jogo</p>
      </div>
      <div className="maps-container">
        {maps.map((map, index) => (
          <div key={index} className="map-card">
            <img src={`/images/maps/${map}.jpg`} alt={map} className="map-image" />
            <div className="map-info">
              <h3>{map}</h3>
              <Link to={`/map/${map.toLowerCase()}`} className="view-lineups-btn">Ver Lineups</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
