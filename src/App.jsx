import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // Importe a página de cadastro
import Header from "./components/Header";
import "./index.css"; 

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> {/* Nova rota de cadastro */}
          <Route path="/map/:mapId" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
