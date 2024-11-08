import React from "react";
import { useParams, Link } from "react-router-dom";
import "./MapPage.css";

const MapPage = () => {
  const { mapId } = useParams();

  const lineups = [
    { name: "Lineup 1", image: `/images/lineup1-${mapId}.png` },
    { name: "Lineup 2", image: `/images/lineup2-${mapId}.png` },
    { name: "Lineup 3", image: `/images/lineup3-${mapId}.png` },
    { name: "Lineup 4", image: `/images/lineup4-${mapId}.png` },
  ];

  return (
    <div className="map-page">
      <div className="back-btn-container">
        <Link to="/" className="back-btn">
          Voltar para a Página Inicial
        </Link>
      </div>

      <h2>{mapId.charAt(0).toUpperCase() + mapId.slice(1)} Lineups</h2>

      <div className="lineups-container">
        {lineups.map((lineup, index) => (
          <div key={index} className="lineup-card">
            <img src={lineup.image} alt={lineup.name} className="lineup-img" />
            <h3>{lineup.name}</h3>
            <button className="favorite-btn">⭐</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
