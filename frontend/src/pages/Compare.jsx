import React, { useState } from 'react';

export default function Compare() {
  const [form, setForm] = useState({ type: '', minPrice: '', maxPrice: '' });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    try {
      const res = await fetch(`http://localhost:5000/api/insurances?${params}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setResults([{ name: 'Error', detail: err.message }]);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Comparar Seguros</h1>
      <form onSubmit={handleSubmit} className="space-y-3 mb-4">
        <input
          className="w-full border p-2"
          name="type"
          placeholder="Tipo de seguro"
          value={form.type}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2"
          name="minPrice"
          placeholder="Precio mínimo"
          value={form.minPrice}
          onChange={handleChange}
        />
        <input
          className="w-full border p-2"
          name="maxPrice"
          placeholder="Precio máximo"
          value={form.maxPrice}
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Buscar
        </button>
      </form>
      {results.length > 0 && (
        <table className="w-full text-left border">
          <thead>
            <tr>
              <th className="border px-2">Nombre</th>
              <th className="border px-2">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td className="border px-2">{r.name}</td>
                <td className="border px-2">{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
