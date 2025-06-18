import { useEffect, useState } from 'react';

export default function Recommendations() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/recommendations')
      .then((res) => res.json())
      .then(setList);
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Recomendaciones</h1>
      <ul className='max-w-md mx-auto space-y-2'>
        {list.map((item) => (
          <li key={item.id} className='border p-2 rounded'>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
