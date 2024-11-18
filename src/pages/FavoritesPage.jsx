import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore"; // Alterei para usar getDoc
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated) {
        try {
          // Referência ao documento do usuário no Firestore
          const userRef = doc(db, "users", user.sub); // Mudando para referenciar o usuário diretamente
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            // Pega as lineups favoritas do campo `favorites` no documento
            const favoriteLineups = userDoc.data().favorites || [];
            setFavorites(favoriteLineups); // Atualiza o estado com as lineups favoritas
          } else {
            setFavorites([]); // Caso o usuário não tenha favoritos
          }
        } catch (error) {
          console.error("Erro ao buscar favoritos:", error);
        }
      }
    };

    fetchFavorites();
  }, [isAuthenticated, user]);

  return (
    <div className="favorites-page">
      <h2>Minhas Lineups Favoritas</h2>

      {isAuthenticated ? (
        <div className="favorites-list">
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => (
              <div key={index} className="favorite-item">
                <h3>{favorite.name}</h3>
                <p>Mapa: {favorite.mapId}</p>
                {/* Exibir vídeo da linha favorita */}
                <iframe
                  width="100%"
                  height="315"
                  src={favorite.video}
                  title={favorite.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))
          ) : (
            <p>Você ainda não tem lineups favoritas.</p>
          )}
        </div>
      ) : (
        <p>Por favor, faça login para ver suas lineups favoritas.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
