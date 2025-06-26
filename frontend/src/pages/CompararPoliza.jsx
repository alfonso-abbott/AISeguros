import React, { useState } from "react";
import axios from "axios";

function CompararPoliza() {
  const [file, setFile] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    const allowed = [".docx", ".pdf"];
    if (
      selected &&
      (allowed.includes(selected.name.slice(-5).toLowerCase()) ||
        selected.name.endsWith(".pdf"))
    ) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Solo se permiten archivos Word (.docx) o PDF");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5004/api/polizas/comparar",
        formData
      );
      setResultado(res.data.resultado);
    } catch (err) {
      console.error(err);
      setError("Error al procesar el archivo.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">📄 Comparar Póliza</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Subir y comparar
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {resultado && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Resultado de comparación:</h3>
          <p>
            <strong>Tipo:</strong> {resultado.tipoSeguro}
          </p>
          <p>
            <strong>Precio:</strong> {resultado.precio}
          </p>
          <p>
            <strong>💠 Cobertura:</strong> {resultado.cobertura}
          </p>
          <div className="mt-2">
            <strong>Beneficios:</strong>
            <ul className="list-disc ml-5">
              {resultado.beneficios.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2">
            <strong>Exclusiones:</strong>
            <ul className="list-disc ml-5">
              {resultado.exclusiones.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompararPoliza;
