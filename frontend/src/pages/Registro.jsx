import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';

export default function Registro() {
  const { login } = useContext(UserContext);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validar = () => {
    if (!nombre || !correo || !password) return 'Todos los campos son obligatorios';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return 'Correo inválido';
    if (password.length < 8 || !/\d/.test(password) || !/[A-Za-z]/.test(password)) return 'Contraseña débil';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = validar();
    if (msg) { setError(msg); return; }
    try {
      const res = await fetch('http://localhost:5000/api/usuarios/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        setError('');
      } else {
        setError(data.error || 'Error');
      }
    } catch (err) {
      setError('Error de red');
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Registro</h1>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-sm mx-auto'>
        <input className='border w-full p-2' placeholder='Nombre' value={nombre} onChange={e=>setNombre(e.target.value)} />
        <input className='border w-full p-2' placeholder='Correo' value={correo} onChange={e=>setCorreo(e.target.value)} />
        <input className='border w-full p-2' type='password' placeholder='Contraseña' value={password} onChange={e=>setPassword(e.target.value)} />
        <button className='bg-blue-500 text-white px-4 py-2' type='submit'>Registrarse</button>
      </form>
      {error && <p className='mt-4 text-center text-red-500'>{error}</p>}
    </div>
  );
}
