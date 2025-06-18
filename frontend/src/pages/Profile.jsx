import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx';

export default function Profile() {
  const { user, token, logout } = useContext(AuthContext);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/profile/quotes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setQuotes(data);
      } catch (err) {
        setQuotes([]);
      }
    };
    if (token) fetchData();
  }, [token]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Perfil</h1>
      {user ? (
        <div className="space-y-3">
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="bg-red-500 text-white px-4 py-2" onClick={logout}>
            Cerrar sesión
          </button>
          <h2 className="text-xl font-semibold mt-4">Cotizaciones guardadas</h2>
          {quotes.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {quotes.map((q, i) => (
                <li key={i}>{q.description}</li>
              ))}
            </ul>
          ) : (
            <p>No hay cotizaciones</p>
          )}
        </div>
      ) : (
        <p className="text-center">No autenticado</p>
      )}
    </div>
  );
}
