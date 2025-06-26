import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function UploadPolicy() {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const res = await fetch('/api/polizas', { headers: { Authorization: `Bearer ${token}` } });
    setList(await res.json());
  };

  useEffect(() => { if(token) load(); }, [token]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append('archivo', file);
    const res = await fetch('/api/polizas/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    const data = await res.json();
    if (res.ok) {
      setMsg(data.message);
      setFile(null);
      load();
    } else {
      setMsg(data.error || 'Error al subir');
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input type="file" onChange={e => setFile(e.target.files[0])} className="border rounded-lg p-2" />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 rounded-lg" type="submit">📤 Subir</button>
      </form>
      {msg && <p className="mb-2 text-sm text-blue-600">{msg}</p>}
      <ul>
        {list.map(p => (
          <li key={p._id}>{p.filename} ({p.mimetype})</li>
        ))}
      </ul>
    </div>
  );
}
