import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Cotizaciones from "./pages/Cotizaciones.jsx";
import CotizacionesTipo from "./pages/CotizacionesTipo.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import UploadPolicy from "./pages/UploadPolicy.jsx";
import CompararPoliza from "./pages/CompararPoliza.jsx";
import Contact from "./pages/Contact.jsx";
import SeguroDetalle from "./pages/SeguroDetalle.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function Navbar() {
  const { token, userName, logout } = useAuth();
  return (
    <nav className="bg-white shadow px-4 py-3 mb-4">
      <ul className="flex flex-wrap gap-4 text-sm font-medium">
        <li><Link to="/">Inicio</Link></li>
        <li>
          <Link to="/cotizaciones">Cotizaciones</Link>
        </li>
        {token && <li><Link to="/recommendations">Recomendaciones</Link></li>}
        {token && <li><Link to="/upload-policy">Pólizas</Link></li>}
        {token && (
          <li>
            <Link to="/comparar-poliza">Comparar Póliza</Link>
          </li>
        )}
        <li><Link to="/contact">Contacto</Link></li>
        {!token && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Registro</Link>
            </li>
          </>
        )}
        {token && (
          <>
            <li>👤 Bienvenido, {userName}</li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        )}
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
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/cotizaciones/:tipo" element={<CotizacionesTipo />} />
        <Route path="/cotizaciones/:tipo/:id" element={<SeguroDetalle />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/upload-policy" element={<UploadPolicy />} />
        <Route path="/comparar-poliza" element={<CompararPoliza />} />
        <Route path="/seguro/:id" element={<SeguroDetalle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
