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
      body: JSON.stringify({
        edad: Number(form.edad),
        tipo: form.tipo
      })
    });
    setRecs(await res.json());
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          name="edad"
          placeholder="Edad"
          type="number"
          onChange={handleChange}
          className="border p-2 rounded flex-1"
        />
        <input
          name="tipo"
          placeholder="Tipo de seguro"
          onChange={handleChange}
          className="border p-2 rounded flex-1"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" type="submit">Obtener</button>
      </form>
      <div className="grid gap-4">
        {recs.map(r => (
          <div key={r.id} className="border rounded shadow p-4">
            <h3 className="font-semibold text-lg mb-1">{r.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Cobertura: {r.cobertura}</p>
            <p className="font-bold">${r.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
