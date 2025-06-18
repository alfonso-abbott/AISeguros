import { useEffect, useState } from 'react';

export default function Recommendations() {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/recommendations')
      .then((res) => res.json())
      .then(setRecs)
      .catch(() => setRecs([]));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Recomendaciones Personalizadas</h1>
      <ul className="space-y-2">
        {recs.map((r) => (
          <li key={r.id} className="border p-2">{r.name}</li>
        ))}
      </ul>
    </div>
  );
}
