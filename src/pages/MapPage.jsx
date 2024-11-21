import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { db } from "../components/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import FeedbackForm from "../components/FeedbackForm"; // Certifique-se de que o caminho esteja correto
import "./MapPage.css";

const MapPage = () => {
  const { mapId } = useParams(); // Obtém o mapId da URL
  const navigate = useNavigate(); // Para navegação programática
  const { isAuthenticated, user } = useAuth0(); // Verifica se o usuário está logado
  const [selectedLineup, setSelectedLineup] = useState(null); // Lineup selecionada
  const [expandedLineup, setExpandedLineup] = useState(null); // Expansão do card
  const [favorites, setFavorites] = useState([]); // Lista de favoritos carregados do Firestore

  // Lineups específicas para cada mapa
  const mirageLineups = [
    { name: "Smoke Cabecinha e CT do mesmo pixel", video: "https://www.youtube.com/embed/RZ3ShaEASag" },
    { name: "Smoke Janela B do tapete (TR)", video: "https://www.youtube.com/embed/zcgtBBq72QA" },
    { name: "Smoke para Janela (TR)", video: "https://www.youtube.com/embed/MaJKlfMTLzg" },
    { name: "Smoke Top Mid da base CT", video: "https://www.youtube.com/embed/7m0PzO3Qaec" },
  ];

  const dust2Lineups = [
    { name: "Smoke Caixa do meio da base (TR)", video: "https://www.youtube.com/embed/ZToD4GRMW00" },
    { name: "Smoke Corner (Fundo)", video: "https://www.youtube.com/embed/7aZsCkQDfWs" },
    { name: "Smoke CT (TR)", video: "https://www.youtube.com/embed/--ct0Z2UpXs" },
    { name: "Smoke Fundo para domínio CT", video: "https://www.youtube.com/embed/L-_bg4obLEs" },
  ];

  const infernoLineups = [
    { name: "Smoke para CT (Banana)", video: "https://www.youtube.com/embed/CvsTPe2Gn_c" },
    { name: "Smoke Areia 2 (Meio)", video: "https://www.youtube.com/embed/J8xYWIX-zRA" },
    { name: "Smoke NIP (MF)", video: "https://www.youtube.com/embed/ewbyezUu1ho" },
    { name: "Smoke da Cav/Banana (CT)", video: "https://www.youtube.com/embed/K50VHoLWZV0" },
  ];

  const nukeLineups = [
    { name: "Smoke Terra em cima da base (TR)", video: "https://www.youtube.com/embed/fVeMs86UKhY" },
    { name: "Duas Smoke mesmo pixel para passagem fora (TR)", video: "https://www.youtube.com/embed/3s9wuqBd8CQ" },
    { name: "Smoke Garagem para domínio (TR)", video: "https://www.youtube.com/embed/CxWaPGmyAkI" },
    { name: "Smoke CAT (TR)", video: "https://www.youtube.com/embed/A5Sx0YVgHGE" },
  ];

  const overpassLineups = [
    { name: "Smoke para o céu da água do cimento (TR)", video: "https://www.youtube.com/embed/ME6WA9GQP6o" },
    { name: "Smoke para a lixeira da Rua (TR)", video: "https://www.youtube.com/embed/c_T1glAvjSU" },
    { name: "Smoke Passagem bomb B da base TR (TR)", video: "https://www.youtube.com/embed/0wBlHwWBVU0" },
    { name: "Smoke Sapão CT (CT)", video: "https://www.youtube.com/embed/mSDbR4vZ8n0" },
  ];

  const getLineupsByMap = (mapId) => {
    switch (mapId.toLowerCase()) {
      case "mirage":
        return mirageLineups;
      case "dust2":
        return dust2Lineups;
      case "inferno":
        return infernoLineups;
      case "nuke":
        return nukeLineups;
      case "overpass":
        return overpassLineups;
      default:
        return [];
    }
  };

  const lineups = getLineupsByMap(mapId);

  const handleLineupClick = (lineup) => {
    if (expandedLineup === lineup.name) {
      setExpandedLineup(null);
    } else {
      setExpandedLineup(lineup.name);
      setSelectedLineup(lineup);
    }
  };

  const handleFavoriteClick = async (lineup) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const userId = user.sub;

    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const currentFavorites = userDoc.data().favorites || [];
        const isFavorite = currentFavorites.some((fav) => fav.name === lineup.name);

        if (isFavorite) {
          await updateDoc(userRef, {
            favorites: arrayRemove(lineup),
          });
          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.name !== lineup.name)
          );
          alert(`Lineup ${lineup.name} foi removida dos favoritos.`);
        } else {
          await updateDoc(userRef, {
            favorites: arrayUnion(lineup),
          });
          setFavorites((prevFavorites) => [...prevFavorites, lineup]);
          alert(`Lineup ${lineup.name} foi favoritada!`);
        }
      } else {
        await setDoc(userRef, {
          favorites: [lineup],
        });
        alert(`Lineup ${lineup.name} foi favoritada!`);
      }
    } catch (error) {
      console.error("Erro ao favoritar a lineup:", error);
      alert("Erro ao favoritar a lineup. Tente novamente.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchFavorites = async () => {
        const userRef = doc(db, "users", user.sub);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setFavorites(userDoc.data().favorites || []);
        }
      };
      fetchFavorites();
    }
  }, [isAuthenticated, user]);

  return (
    <div className="map-page">
      <div className="back-btn-container">
        <Link to="/" className="back-btn">Voltar para a Página Inicial</Link>
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
                e.stopPropagation();
                handleFavoriteClick(lineup);
              }}
              className={`favorite-btn ${favorites.some((fav) => fav.name === lineup.name) ? "favorited" : ""}`}
            >
              {favorites.some((fav) => fav.name === lineup.name) ? "★" : "☆"}
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
                <FeedbackForm mapId={mapId} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
