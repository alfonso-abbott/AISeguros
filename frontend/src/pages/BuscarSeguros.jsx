import { useState } from 'react';

export default function BuscarSeguros() {
  const [tipo, setTipo] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [cobertura, setCobertura] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscar = async () => {
    const params = new URLSearchParams();
    if (tipo) params.append('tipo', tipo);
    if (precioMin) params.append('precioMin', precioMin);
    if (precioMax) params.append('precioMax', precioMax);
    if (cobertura) params.append('cobertura', cobertura);
    const res = await fetch(`http://localhost:5000/api/seguros/buscar?${params.toString()}`);
    const data = await res.json();
    setResultados(data);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Buscar Seguros</h1>
      <div className='space-y-2 max-w-md mx-auto mb-4'>
        <input className='border w-full p-2' placeholder='Tipo' value={tipo} onChange={e=>setTipo(e.target.value)} />
        <input className='border w-full p-2' placeholder='Precio mínimo' value={precioMin} onChange={e=>setPrecioMin(e.target.value)} />
        <input className='border w-full p-2' placeholder='Precio máximo' value={precioMax} onChange={e=>setPrecioMax(e.target.value)} />
        <input className='border w-full p-2' placeholder='Cobertura' value={cobertura} onChange={e=>setCobertura(e.target.value)} />
        <button className='bg-blue-500 text-white px-4 py-2' onClick={buscar}>Buscar</button>
      </div>
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
