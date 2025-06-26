import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', tipo: '', mensaje: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log({
      nombre: form.name,
      correo: form.email,
      tipo: form.tipo,
      mensaje: form.mensaje,
    });
    alert("Mensaje enviado. Pronto nos contactaremos contigo.");
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 flex flex-col gap-2">
      <h1 className="text-xl font-bold text-center mb-2">Contacto</h1>
      {sent && <p className="text-green-600 text-sm">Mensaje enviado</p>}
      <input name="name" placeholder="Nombre" onChange={handleChange} className="border p-2" />
      <input name="email" placeholder="Correo" onChange={handleChange} className="border p-2" />
      <select name="tipo" onChange={handleChange} className="border p-2">
        <option value="">Tipo de consulta</option>
        <option value="general">General</option>
        <option value="soporte">Soporte</option>
      </select>
      <textarea name="mensaje" placeholder="Mensaje" onChange={handleChange} className="border p-2" />
      <button className="bg-blue-500 text-white p-2" type="submit">Enviar</button>
    </form>
  );
}
