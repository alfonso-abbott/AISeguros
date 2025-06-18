import { useState } from 'react';

export default function Compare() {
  const [query, setQuery] = useState('');
  const [insurances, setInsurances] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/insurances?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setInsurances(data);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Comparar Seguros</h1>
      <form onSubmit={handleSearch} className='flex gap-2 max-w-md mx-auto mb-4'>
        <input
          className='border flex-1 p-2'
          placeholder='Buscar seguro'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='bg-blue-500 text-white px-4 py-2' type='submit'>Buscar</button>
      </form>
      <ul className='max-w-md mx-auto space-y-2'>
        {insurances.map((ins) => (
          <li key={ins.id} className='border p-2 rounded'>
            {ins.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
