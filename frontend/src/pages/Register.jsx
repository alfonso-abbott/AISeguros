import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(form.password)) {
      setError('La contraseña debe tener 8 caracteres y combinar letras y números');
      return;
    }
    await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold text-center mb-2">Registro</h1>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input name="name" placeholder="Nombre" onChange={handleChange} className="border p-2" />
      <input name="email" placeholder="Correo" onChange={handleChange} className="border p-2" />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} className="border p-2" />
      <button className="bg-blue-500 text-white p-2" type="submit">Registrarse</button>
    </form>
  );
}
