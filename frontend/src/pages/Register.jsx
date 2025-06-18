import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(form);
    if (result.success) {
      setMessage('Registro exitoso');
    } else {
      setMessage(result.error || 'Error al registrar');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border p-2"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
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
          Registrarse
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}
