import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import segurosData from '../data/segurosData.js';
import {
  BENEFICIOS_POSIBLES,
  EXCLUSIONES_POSIBLES
} from '../data/filtrosOpciones.js';

export default function CotizacionesTipo() {
  const { tipo } = useParams();
  const segurosDelTipo = segurosData.filter(s => s.tipo === tipo);

  const coberturasUnicas = Array.from(
    new Set(segurosDelTipo.map(s => s.cobertura))
  );
  const precios = segurosDelTipo.map(s => s.precio);
  const minPrecio = Math.min(...precios);
  const maxPrecio = Math.max(...precios);
  const pasosPrecio = [];
  for (
    let p = Math.floor(minPrecio / 10000) * 10000;
    p <= Math.ceil(maxPrecio / 10000) * 10000;
    p += 10000
  ) {
    pasosPrecio.push(p);
  }

  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCobertura, setFiltroCobertura] = useState("");
  const [filtroMin, setFiltroMin] = useState("");
  const [filtroMax, setFiltroMax] = useState("");
  const [filtroBeneficio, setFiltroBeneficio] = useState("");
  const [filtroExclusion, setFiltroExclusion] = useState("");

  const segurosFiltrados = segurosDelTipo.filter(seguro => {
    const nombreCoincide = seguro.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coberturaCoincide =
      filtroCobertura === "" || seguro.cobertura.toLowerCase() === filtroCobertura.toLowerCase();
    const precioCoincide =
      (!filtroMin || seguro.precio >= parseInt(filtroMin)) &&
      (!filtroMax || seguro.precio <= parseInt(filtroMax));
    const beneficioCoincide =
      !filtroBeneficio ||
      seguro.beneficios.some(b =>
        b.toLowerCase().includes(filtroBeneficio.toLowerCase())
      );
    const exclusionCoincide =
      !filtroExclusion ||
      seguro.exclusiones.some(e =>
        e.toLowerCase().includes(filtroExclusion.toLowerCase())
      );
    return (
      nombreCoincide &&
      coberturaCoincide &&
      precioCoincide &&
      beneficioCoincide &&
      exclusionCoincide
    );
  });

  const formatCLP = n => new Intl.NumberFormat('es-CL').format(n);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-teal-800 mb-6 capitalize">Seguros de {tipo}</h1>
      <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded-md shadow mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filtroNombre}
          onChange={e => setFiltroNombre(e.target.value)}
          className="border rounded px-2 py-1 w-60"
        />
        <select
          value={filtroCobertura}
          onChange={e => setFiltroCobertura(e.target.value)}
          className="border rounded px-2 py-1 w-40 capitalize"
        >
          <option value="">Cobertura</option>
          {coberturasUnicas.map(c => (
            <option key={c} value={c} className="capitalize">
              {c}
            </option>
          ))}
        </select>
        <select
          value={filtroBeneficio}
          onChange={e => setFiltroBeneficio(e.target.value)}
          className="border rounded px-2 py-1 w-48"
        >
          <option value="">Beneficio</option>
          {BENEFICIOS_POSIBLES.map(b => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          value={filtroExclusion}
          onChange={e => setFiltroExclusion(e.target.value)}
          className="border rounded px-2 py-1 w-48"
        >
          <option value="">Exclusión</option>
          {EXCLUSIONES_POSIBLES.map(e => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select
          value={filtroMin}
          onChange={e => setFiltroMin(e.target.value)}
          className="border rounded px-2 py-1 w-28"
        >
          <option value="">Precio mínimo</option>
          {pasosPrecio.map(p => (
            <option key={p} value={p}>
              {formatCLP(p)}
            </option>
          ))}
        </select>
        <select
          value={filtroMax}
          onChange={e => setFiltroMax(e.target.value)}
          className="border rounded px-2 py-1 w-28"
        >
          <option value="">Precio máximo</option>
          {pasosPrecio.map(p => (
            <option key={p} value={p}>
              {formatCLP(p)}
            </option>
          ))}
        </select>
      </div>

      {segurosFiltrados.length === 0 ? (
        <p className="text-gray-600">❌ No se encontraron resultados con los filtros aplicados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segurosFiltrados.map(seguro => (
            <div key={seguro.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col">
              <h3 className="font-semibold text-lg mb-1 text-teal-700">{seguro.nombre}</h3>
              <p className="text-sm mb-1 capitalize">Cobertura: {seguro.cobertura}</p>
          <p className="text-sm mb-2">{seguro.descripcion}</p>
          <p className="font-bold mb-3">${formatCLP(seguro.precio)}</p>
          <ul className="list-disc pl-4 text-sm text-green-800">
            {seguro.beneficios.map(b => (
              <li key={b}>✔️ {b}</li>
            ))}
          </ul>
          <ul className="list-disc pl-4 text-sm text-red-800 mt-2">
            {seguro.exclusiones.map(e => (
              <li key={e}>❌ {e}</li>
            ))}
          </ul>
          <Link to={`/cotizaciones/${tipo}/${seguro.id}`} className="mt-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg text-center">Ver detalles</Link>
        </div>
          ))}
        </div>
      )}
    </div>
  );
}
