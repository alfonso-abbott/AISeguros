import { useEffect, useState } from 'react';

export default function Compare() {
  const [insurances, setInsurances] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/insurances')
      .then((res) => res.json())
      .then(setInsurances)
      .catch(() => setInsurances([]));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Comparador de Seguros</h1>
      <ul className="space-y-2">
        {insurances.map((i) => (
          <li key={i.id} className="border p-2">{i.name}</li>
        ))}
      </ul>
    </div>
  );
}
