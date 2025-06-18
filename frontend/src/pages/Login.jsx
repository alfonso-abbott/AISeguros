import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      login(data.user, data.token);
      setError('');
    } else {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-sm mx-auto'>
        <input
          className='border w-full p-2'
          placeholder='Usuario'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
