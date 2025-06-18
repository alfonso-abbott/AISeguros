import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();
  if (!user) {
    return <p className="p-4 text-center">Debes iniciar sesión</p>;
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Perfil de Usuario</h1>
      <p>Usuario: {user.username}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}
