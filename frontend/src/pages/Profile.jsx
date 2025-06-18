import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className='p-6 text-center'>
      <h1 className='text-2xl font-bold mb-4'>Perfil de Usuario</h1>
      {user ? (
        <>
          <p className='mb-4'>Usuario: {user.username}</p>
          <button onClick={logout} className='bg-red-500 text-white px-4 py-2'>
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>No has iniciado sesión</p>
      )}
    </div>
  );
}
