import { useState } from 'react';

export default function ResetPassword() {
  const [form, setForm] = useState({ token: '', password: '', confirm: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setMsg('Las contraseñas no coinciden');
      return;
    }
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: form.token, password: form.password })
    });
    const data = await res.json();
    setMsg(res.ok ? data.message : data.error || 'Error');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold text-center mb-2">✉️ Restablecer contraseña</h1>
      {msg && <p className="text-blue-600 text-sm">{msg}</p>}
      <input name="token" className="border p-2 rounded" placeholder="Token" onChange={handleChange} />
      <input name="password" type="password" className="border p-2 rounded" placeholder="Nueva contraseña" onChange={handleChange} />
      <input name="confirm" type="password" className="border p-2 rounded" placeholder="Confirmar contraseña" onChange={handleChange} />
      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" type="submit">Enviar</button>
    </form>
  );
}
