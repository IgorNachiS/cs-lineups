import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Para verificar se o usuário está logado
import FeedbackForm from "../components/FeedbackForm"; // Importa o componente de feedback
import "./MapPage.css"; // Importa o arquivo CSS

const MapPage = () => {
  const { mapId } = useParams(); // Pega o mapId da URL
  const navigate = useNavigate(); // Para navegação programática
  const { isAuthenticated } = useAuth0(); // Verifica se o usuário está logado

  // Lineups de exemplo
  const lineups = [
    { name: "Lineup 1", video: "https://www.youtube.com/embed/VIDEO_ID_1" },
    { name: "Lineup 2", video: "https://www.youtube.com/embed/VIDEO_ID_2" },
    { name: "Lineup 3", video: "https://www.youtube.com/embed/VIDEO_ID_3" },
    { name: "Lineup 4", video: "https://www.youtube.com/embed/VIDEO_ID_4" },
  ];

  const [selectedLineup, setSelectedLineup] = useState(null); // Para controlar a lineup selecionada
  const [expandedLineup, setExpandedLineup] = useState(null); // Para controlar a expansão do card

  // Função que lida com o clique no card
  const handleLineupClick = (lineup) => {
    if (expandedLineup === lineup.name) {
      setExpandedLineup(null); // Volta o card para o estado original
    } else {
      setExpandedLineup(lineup.name); // Expande o card
      setSelectedLineup(lineup); // Exibe o vídeo e o feedback
    }
  };

  // Função que lida com o clique no ícone de favoritar
  const handleFavoriteClick = (lineup) => {
    if (!isAuthenticated) {
      navigate("/login"); // Redireciona para a página de login se não estiver logado
    }
    // Caso o usuário esteja logado, adicione aqui a lógica de favoritar
  };

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
          <div
            key={index}
            className={`lineup-card ${expandedLineup === lineup.name ? "expanded" : ""}`}
            onClick={() => handleLineupClick(lineup)}
          >
            <h3>{lineup.name}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Previne que o clique na estrela abra o vídeo
                handleFavoriteClick(lineup);
              }}
              className="favorite-btn"
            >
              ⭐
            </button>
            {expandedLineup === lineup.name && (
              <div className="lineup-video-feedback">
                <iframe
                  width="100%"
                  height="315"
                  src={lineup.video}
                  title={lineup.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                {/* Formulário de Feedback abaixo do vídeo */}
                <FeedbackForm />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
