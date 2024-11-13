
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    loginWithRedirect();
    return null; // Enquanto redireciona, não renderiza nada
  }

  return children; // Renderiza o componente filho se o usuário estiver autenticado
};

export default ProtectedRoute;
