import { useNavigate } from 'react-router-dom';

const tiposSeguros = [
  { tipo: "auto", nombre: "Seguro de Auto", icono: "🚗" },
  { tipo: "vida", nombre: "Seguro de Vida", icono: "❤️" },
  { tipo: "mascotas", nombre: "Seguro de Mascotas", icono: "🐶" },
  { tipo: "salud", nombre: "Seguro de Salud", icono: "🏥" },
  { tipo: "viajes", nombre: "Seguro de Viajes", icono: "✈️" },
  { tipo: "hogar", nombre: "Seguro de Hogar", icono: "🏡" }
];

export default function Cotizaciones() {
  const navigate = useNavigate();
  const irA = (tipo) => navigate(`/cotizaciones/${tipo}`); // Navegar a /cotizaciones/${tipo}

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-teal-800 mb-6">Cotizaciones</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tiposSeguros.map(t => (
          <div
            key={t.tipo}
            onClick={() => irA(t.tipo)}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
          >
            <div className="text-4xl mb-2">{t.icono}</div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">{t.nombre}</h3>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold">
              Ver opciones
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
