import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { token, userName } = useAuth();
  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-md p-10 m-6">
        <img src="/logo_aiseguros.png" alt="Logo AI Seguros" className="w-32 h-32 mb-4" />
        <div className="text-4xl font-bold mb-4">🛡️ Bienvenido a AISeguros</div>
        <div className="text-lg mb-8 text-gray-700 max-w-xl">
          Tu seguridad, nuestra prioridad. Compara, cotiza y elige entre más de 100 planes de seguros para cada necesidad.
        </div>
        {token && (
          <p className="mt-6 text-xl text-gray-800">
            Explora las mejores opciones de seguros personalizadas para ti, <strong>{userName}</strong>
          </p>
        )}
        <div className="flex gap-6 mt-4">
          <a href="/cotizaciones" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow">
            Ver Cotizaciones
          </a>
          {!token && (
            <a
              href="/login"
              className="bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-100 px-6 py-2 rounded-lg shadow"
            >
              Iniciar Sesión
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
