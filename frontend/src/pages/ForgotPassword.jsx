import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (res.ok) setMsg(`${data.message}: ${data.token}`);
    else setMsg(data.error || 'Error');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold text-center mb-2">🔒 Recuperar contraseña</h1>
      {msg && <p className="text-blue-600 text-sm">{msg}</p>}
      <input type="email" className="border p-2 rounded" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded" type="submit">Enviar</button>
    </form>
  );
}
