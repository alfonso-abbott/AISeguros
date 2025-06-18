import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx';

export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenido a AISeguros</h1>
      {user && <p className="text-lg">Hola {user.name}!</p>}
    </div>
  );
}
