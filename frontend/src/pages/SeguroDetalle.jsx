import { useParams } from 'react-router-dom';
import segurosData from '../data/segurosData.js';

export default function SeguroDetalle() {
  const { id } = useParams();
  const seguro = segurosData.find(s => s.id === parseInt(id));

  const formatCLP = n => new Intl.NumberFormat('es-CL').format(n);

  if (!seguro) {
    return <p className="p-4 text-center">Seguro no encontrado</p>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-teal-800 mb-4">{seguro.nombre}</h1>
        <p className="text-gray-700 mb-4">{seguro.descripcion}</p>
        <p className="text-lg font-semibold text-gray-800 mb-2">Precio: ${formatCLP(seguro.precio)}</p>
        <p className="capitalize mb-4">Cobertura: {seguro.cobertura}</p>
        <h2 className="font-semibold mb-2 text-teal-700">Beneficios</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          {seguro.beneficios.map((b, i) => <li key={i}>✔ {b}</li>)}
        </ul>
        <h2 className="font-semibold mb-2 text-teal-700">Exclusiones</h2>
        <ul className="list-disc pl-5 text-gray-700">
          {seguro.exclusiones.map((e, i) => <li key={i}>✖ {e}</li>)}
        </ul>

        <div className="mt-8 p-6 bg-teal-50 border border-teal-100 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-teal-900 mb-4">Cotiza este seguro</h2>
          <p className="text-gray-700 mb-2">
            <strong>Teléfono:</strong>{' '}
            <a href={`tel:${seguro.contacto.telefono}`} className="text-teal-800 hover:underline">
              +56 9 8765 4321
            </a>
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Correo:</strong>{' '}
            <a href={`mailto:${seguro.contacto.correo}`} className="text-teal-800 hover:underline">
              {seguro.contacto.correo}
            </a>
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-lg">
            Quiero este seguro
          </button>
        </div>
      </div>
    </div>
  );
}
