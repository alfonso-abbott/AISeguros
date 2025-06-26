import { useState } from 'react';

export default function Recommendations() {
  const [form, setForm] = useState({ edad: '', tipo: '' });
  const [recs, setRecs] = useState([]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/recomendaciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setRecs(await res.json());
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input name="edad" placeholder="Edad" onChange={handleChange} className="border p-1" />
        <input name="tipo" placeholder="Tipo" onChange={handleChange} className="border p-1" />
        <button className="bg-blue-500 text-white px-3" type="submit">Obtener</button>
      </form>
      <ul>
        {recs.map(r => (
          <li key={r.id} className="border-b py-1">{r.name} - ${r.precio}</li>
        ))}
      </ul>
    </div>
  );
}
