import React from "react";
import { Link } from "react-router-dom";

const PaginaError = () => {
  return (
    <div textAlign="center">
      <h2>404 - Página No Encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default PaginaError;
