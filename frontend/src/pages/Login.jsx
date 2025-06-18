import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';

export default function Login() {
  const { login } = useContext(UserContext);
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password }),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.user, data.token);
      setError('');
    } else {
      setError(data.error || 'Credenciales inválidas');
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-sm mx-auto'>
        <input
          className='border w-full p-2'
          placeholder='Correo'
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          className='border w-full p-2'
          type='password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='bg-blue-500 text-white px-4 py-2' type='submit'>
          Iniciar sesión
        </button>
      </form>
      {error && <p className='mt-4 text-center text-red-500'>{error}</p>}
    </div>
  );
}
