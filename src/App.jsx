import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import FavoritesPage from "./pages/FavoritesPage"; // Página de favoritos
import ProtectedRoute from "./components/ProtectedRoute"; // Protege a página de favoritos, se necessário
import "./index.css";

function App() {
  const domain = "dev-mcpiks6xkdmxapjd.us.auth0.com";
  const clientId = "Wu3m6RYdTqb8AowYWtB641OBGuKRRG3F";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/map/:mapId" element={<MapPage />} />
            {/* Rota para favoritos, protegendo se necessário */}
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
