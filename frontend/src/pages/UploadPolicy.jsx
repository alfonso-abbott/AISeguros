import { useState } from 'react';

export default function UploadPolicy() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/policy', {
      method: 'POST',
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Cargar Póliza Actual</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <input type="file" className="block" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          Subir
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
