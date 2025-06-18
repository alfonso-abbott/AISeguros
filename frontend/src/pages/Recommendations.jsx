import { useEffect, useState } from 'react';

export default function Recommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    const fetchRecs = async () => {
      const res = await fetch('http://localhost:5000/api/recommendations', {
        method: 'POST',
      });
      const data = await res.json();
      setRecs(data);
    };
    fetchRecs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Recomendaciones Personalizadas</h1>
      <ul className="space-y-2">
        {recs.map((r) => (
          <li key={r.id} className="border p-2">
            {r.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
