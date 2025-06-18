import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import BuscarSeguros from "./pages/BuscarSeguros.jsx";
import Recomendaciones from "./pages/Recomendaciones.jsx";
import Perfil from "./pages/Perfil.jsx";
import UploadPolicy from "./pages/UploadPolicy.jsx";

function Navbar() {
  return (
    <nav className="bg-white shadow px-4 py-3 mb-4">
      <ul className="flex flex-wrap gap-4 text-sm font-medium">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/registro">Registro</Link></li>
        <li><Link to="/buscar">Buscar Seguros</Link></li>
        <li><Link to="/upload-policy">Subir Póliza</Link></li>
        <li><Link to="/recomendaciones">Recomendaciones</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/buscar" element={<BuscarSeguros />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/upload-policy" element={<UploadPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
