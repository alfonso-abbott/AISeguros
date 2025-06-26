import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function UploadPolicy() {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await fetch('/api/polizas', { headers: { Authorization: `Bearer ${token}` } });
    setList(await res.json());
  };

  useEffect(() => { if(token) load(); }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    await fetch('/api/polizas', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    setFile(null);
    load();
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button className="bg-blue-500 text-white px-3" type="submit">Subir</button>
      </form>
      <ul>
        {list.map(p => (
          <li key={p._id}>{p.filename} ({p.mimetype})</li>
        ))}
      </ul>
    </div>
  );
}
