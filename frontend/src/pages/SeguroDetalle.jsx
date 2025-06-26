import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SeguroDetalle() {
  const { id } = useParams();
  const [seguro, setSeguro] = useState(null);

  useEffect(() => {
    axios.get(`/api/seguros/${id}`).then(res => setSeguro(res.data));
  }, [id]);

  const formatCLP = (n) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);

  if (!seguro) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-2 text-teal-700">{seguro.name}</h1>
      <p className="mb-2">{seguro.descripcion}</p>
      <p className="font-semibold mb-4">Precio: {formatCLP(seguro.precio)}</p>
      <h2 className="font-semibold mb-1">Beneficios</h2>
      <ul className="list-disc pl-5 mb-4">
        {seguro.beneficios.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <h2 className="font-semibold mb-1">Exclusiones</h2>
      <ul className="list-disc pl-5 mb-6">
        {seguro.exclusiones.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
      <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">Cotizar / Contactar</button>
    </div>
  );
}
