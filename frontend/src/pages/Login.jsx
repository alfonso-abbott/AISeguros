import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.token) {
      login(data.token);
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold text-center mb-2">Iniciar sesión</h1>
      <input name="email" placeholder="Correo" onChange={handleChange} className="border p-2" />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} className="border p-2" />
      <button className="bg-blue-500 text-white p-2" type="submit">Entrar</button>
    </form>
  );
}
