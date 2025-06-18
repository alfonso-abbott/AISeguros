import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Compare from "./pages/Compare.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import Profile from "./pages/Profile.jsx";
import UploadPolicy from "./pages/UploadPolicy.jsx";

function Navbar() {
  return (
    <nav className="bg-white shadow px-4 py-3 mb-4">
      <ul className="flex flex-wrap gap-4 text-sm font-medium">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Registro</Link></li>
        <li><Link to="/compare">Comparar</Link></li>
        <li><Link to="/upload-policy">Subir Póliza</Link></li>
        <li><Link to="/recommendations">Recomendaciones</Link></li>
        <li><Link to="/profile">Perfil</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload-policy" element={<UploadPolicy />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
