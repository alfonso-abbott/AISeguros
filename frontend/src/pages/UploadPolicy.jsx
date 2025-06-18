import { useState } from 'react';

export default function UploadPolicy() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Subir Póliza</h1>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-md mx-auto'>
        <input
          type='file'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className='bg-blue-500 text-white px-4 py-2' type='submit'>
          Subir
        </button>
      </form>
      {message && <p className='mt-4 text-center'>{message}</p>}
    </div>
  );
}
