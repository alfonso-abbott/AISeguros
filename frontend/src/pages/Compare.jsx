import { useState } from 'react';

export default function Compare() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/insurances');
    const data = await res.json();
    if (keyword) {
      setResults(data.filter((i) => i.name.toLowerCase().includes(keyword.toLowerCase())));
    } else {
      setResults(data);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Comparador de Seguros</h1>
      <form onSubmit={handleSearch} className="space-y-4 max-w-sm mx-auto">
        <input
          className="border p-2 w-full"
          placeholder="Filtrar por palabra clave"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Buscar
        </button>
      </form>
      {results.length > 0 && (
        <ul className="mt-4 space-y-2">
          {results.map((r) => (
            <li key={r.id} className="border p-2">
              {r.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
