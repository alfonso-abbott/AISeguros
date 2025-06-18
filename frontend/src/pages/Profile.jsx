import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext.jsx';

export default function Profile() {
  const { user, fetchProfile } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {
    const data = await fetchProfile();
    setProfile(data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Perfil de Usuario</h1>
      {user ? (
        <p className="mb-4 text-center">Bienvenido, {user.name}</p>
      ) : (
        <p className="mb-4 text-center">No has iniciado sesión</p>
      )}
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={loadProfile}>
        Cargar Perfil
      </button>
      {profile && (
        <div>
          <h2 className="font-semibold mt-2">Cotizaciones Guardadas</h2>
          <ul className="list-disc pl-5">
            {profile.quotes.map((q) => (
              <li key={q.id}>{q.insurance}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
