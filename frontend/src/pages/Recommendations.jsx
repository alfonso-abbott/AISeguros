import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import segurosData from '../data/segurosData.js';

export default function Recommendations() {
  const { token } = useAuth();
  const [filtros, setFiltros] = useState({ tipo: '', edad: '', presupuesto: '' });
  const [recs, setRecs] = useState([]);

  const handleChange = e => setFiltros({ ...filtros, [e.target.name]: e.target.value });

  const filtrar = () => {
    let lista = segurosData;
    if (filtros.tipo) {
      lista = lista.filter(s => s.tipo === filtros.tipo);
    }
    if (filtros.presupuesto) {
      if (filtros.presupuesto === 'low') lista = lista.filter(s => s.precio < 100000);
      if (filtros.presupuesto === 'mid') lista = lista.filter(s => s.precio >= 100000 && s.precio <= 200000);
      if (filtros.presupuesto === 'high') lista = lista.filter(s => s.precio > 200000);
    }
    setRecs(lista.slice(0, 6));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {!token && (
        <p className="mb-4 text-sm text-orange-600">
          🔒 Para obtener recomendaciones personalizadas, por favor inicia sesión.
        </p>
      )}
      <form
        onSubmit={e => {
          e.preventDefault();
          filtrar();
        }}
        className="flex flex-col gap-3 mb-6"
      >
        <select
          name="tipo"
          value={filtros.tipo}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Tipo de seguro</option>
          <option value="auto">Auto</option>
          <option value="vida">Vida</option>
          <option value="salud">Salud</option>
          <option value="mascotas">Mascotas</option>
          <option value="viajes">Viajes</option>
          <option value="hogar">Hogar</option>
        </select>
        <select
          name="edad"
          value={filtros.edad}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Edad</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46-60">46-60</option>
          <option value="60+">60+</option>
        </select>
        <select
          name="presupuesto"
          value={filtros.presupuesto}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Presupuesto aproximado</option>
          <option value="low">menos de $100.000</option>
          <option value="mid">$100.000 - $200.000</option>
          <option value="high">más de $200.000</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Filtrar
        </button>
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
      {recs.length === 0 && (
        <p className="text-center text-gray-600 mt-4">
          😕 No encontramos seguros que coincidan con tus criterios. Prueba con otras combinaciones.
        </p>
      )}
      {recs.length > 0 && (
        <div className="text-center mt-6">
          <a
            href="/cotizaciones"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Ver todos los seguros
          </a>
        </div>
      )}
    </div>
  );
}
