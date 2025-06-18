import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext.jsx';

export default function UploadPolicy() {
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('policy', file);
    try {
      const res = await fetch('http://localhost:5000/api/policies/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.text();
      setMessage(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Cargar Póliza</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">
          Subir
        </button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}
