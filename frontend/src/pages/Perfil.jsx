import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';

export default function Perfil() {
  const { user, logout } = useContext(UserContext);
  return (
    <div className='p-6 text-center'>
      <h1 className='text-2xl font-bold mb-4'>Perfil de Usuario</h1>
      {user ? (
        <>
          <p className='mb-4'>Correo: {user.email}</p>
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
