import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if (result.success) {
      setMessage('Autenticado');
    } else {
      setMessage(result.error || 'Credenciales inválidas');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border p-2"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border p-2"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Entrar
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}
