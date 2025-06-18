import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx';

export default function Recommendations() {
  const { token } = useContext(AuthContext);
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/recommendations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setRecs(data);
      } catch (err) {
        setRecs([{ name: 'Error', detail: err.message }]);
      }
    };
    fetchRecs();
  }, [token]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Recomendaciones</h1>
      {recs.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {recs.map((r, i) => (
            <li key={i}>{r.name} - {r.detail}</li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Sin datos</p>
      )}
    </div>
  );
}
