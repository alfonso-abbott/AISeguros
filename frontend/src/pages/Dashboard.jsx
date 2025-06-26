import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { token } = useAuth();
  const [seguros, setSeguros] = useState([]);
  const [filters, setFilters] = useState({ tipo: '', cobertura: '', min: '', max: '' });

  const load = async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k,v]) => v && params.append(k, v));
    const res = await fetch(`/api/seguros?${params}`);
    setSeguros(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleChange = e => setFilters({ ...filters, [e.target.name]: e.target.value });
  const applyFilters = e => { e.preventDefault(); load(); };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Listado de Seguros</h1>
      <form onSubmit={applyFilters} className="flex flex-wrap gap-2 mb-4">
        <input name="tipo" placeholder="Tipo" className="border p-1" onChange={handleChange} />
        <input name="cobertura" placeholder="Cobertura" className="border p-1" onChange={handleChange} />
        <input name="min" placeholder="Min" className="border p-1" onChange={handleChange} />
        <input name="max" placeholder="Max" className="border p-1" onChange={handleChange} />
        <button className="bg-blue-500 text-white px-3" type="submit">Filtrar</button>
      </form>
      <ul>
        {seguros.map(s => (
          <li key={s.id} className="border-b py-1">{s.name} - ${s.precio}</li>
        ))}
      </ul>
    </div>
  );
}
