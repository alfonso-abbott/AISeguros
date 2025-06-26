import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { token, userName } = useAuth();
  const [seguros, setSeguros] = useState([]);
  const [filters, setFilters] = useState({ tipo: '', cobertura: '', min: '', max: '' });

  const load = async () => {
    const res = await fetch('/api/seguros/filtrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    });
    setSeguros(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleChange = e => setFilters({ ...filters, [e.target.name]: e.target.value });
  const applyFilters = e => {
    e.preventDefault();
    if ((filters.min && isNaN(filters.min)) || (filters.max && isNaN(filters.max))) {
      alert('Min y Max deben ser numéricos');
      return;
    }
    load();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Bienvenido {userName}</h1>
      <h2 className="text-lg font-semibold mb-4">Listado de Seguros</h2>
      <form onSubmit={applyFilters} className="flex flex-wrap gap-2 mb-4">
        <input name="tipo" placeholder="Tipo" className="border p-2 rounded-lg shadow" onChange={handleChange} />
        <input name="cobertura" placeholder="Cobertura" className="border p-2 rounded-lg shadow" onChange={handleChange} />
        <input name="min" placeholder="Min" className="border p-2 rounded-lg shadow" onChange={handleChange} />
        <input name="max" placeholder="Max" className="border p-2 rounded-lg shadow" onChange={handleChange} />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-lg shadow" type="submit">Filtrar</button>
      </form>
      {seguros.length === 0 ? (
        <p>No se encontraron seguros</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {seguros.map(s => (
            <div key={s.id} className="border rounded-lg p-4 shadow bg-white">
              <h3 className="font-semibold text-lg mb-1">{s.name}</h3>
              <p className="text-sm">Cobertura: {s.cobertura}</p>
              <p className="text-sm font-bold">Precio: ${s.precio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
