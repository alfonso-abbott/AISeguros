import { useState } from 'react';

export default function Recomendaciones() {
  const [edad, setEdad] = useState('');
  const [tipo, setTipo] = useState('');
  const [resultados, setResultados] = useState([]);

  const recomendar = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/seguros/recomendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ edad, tipo })
    });
    const data = await res.json();
    setResultados(data);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Recomendaciones</h1>
      <form onSubmit={recomendar} className='space-y-2 max-w-md mx-auto mb-4'>
        <input className='border w-full p-2' placeholder='Edad' value={edad} onChange={e=>setEdad(e.target.value)} />
        <input className='border w-full p-2' placeholder='Tipo' value={tipo} onChange={e=>setTipo(e.target.value)} />
        <button className='bg-blue-500 text-white px-4 py-2' type='submit'>Obtener</button>
      </form>
      <ul className='space-y-2'>
        {resultados.map(s => (
          <li key={s._id} className='border p-2 rounded'>
            {s.name} - ${s.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
