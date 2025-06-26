import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { userName } = useAuth();
  const [seguros, setSeguros] = useState([]);
  const [filters, setFilters] = useState({ tipo: '', cobertura: '', min: '', max: '' });

  const formatCLP = (n) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);

  const load = async () => {
    const params = {};
    if (filters.tipo) params.tipo = filters.tipo;
    if (filters.cobertura) params.cobertura = filters.cobertura;
    if (filters.min) params.min = filters.min;
    if (filters.max) params.max = filters.max;
    const res = await axios.get('/api/seguros', { params });
    setSeguros(res.data);
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
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bienvenido {userName}</h1>
      <form onSubmit={applyFilters} className="bg-white shadow rounded-lg p-4 flex flex-wrap gap-2 mb-6">
        <input name="tipo" placeholder="Tipo" className="border p-2 rounded flex-1" onChange={handleChange} />
        <input name="cobertura" placeholder="Cobertura" className="border p-2 rounded flex-1" onChange={handleChange} />
        <input name="min" placeholder="Precio mínimo" type="number" className="border p-2 rounded w-32" onChange={handleChange} />
        <input name="max" placeholder="Precio máximo" type="number" className="border p-2 rounded w-32" onChange={handleChange} />
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 rounded" type="submit">Filtrar</button>
      </form>
      {seguros.length === 0 ? (
        <p className="text-center text-gray-600">No se encontraron seguros disponibles con esos filtros</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {seguros.map(s => (
            <Link to={`/seguro/${s._id}`} key={s._id} className="border rounded-lg p-4 shadow hover:shadow-lg bg-white flex flex-col">
              <h3 className="font-semibold text-lg mb-1 text-teal-700">{s.name}</h3>
              <p className="text-sm mb-1">Cobertura: {s.cobertura}</p>
              <p className="text-sm font-bold">{formatCLP(s.precio)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
