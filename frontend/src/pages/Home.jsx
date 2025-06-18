import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenido a AISeguros</h1>
      {user && <p className="text-green-700">Sesión iniciada como {user.username}</p>}
    </div>
  );
}
