const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');
const stringSimilarity = require('string-similarity');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/comparar', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  let text = '';

  try {
    if (ext === '.docx') {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else if (ext === '.pdf') {
      const data = await fs.promises.readFile(filePath);
      const result = await pdfParse(data);
      text = result.text;
    } else {
      return res.status(400).json({ error: 'Formato no soportado' });
    }

    const tipoSeguro = extraerValor(text, /Tipo de seguro:\s*(.+)/i);
    const cobertura = extraerValor(text, /Cobertura:\s*(.+)/i);
    const precio = extraerValor(text, /Precio mensual:\s*(.+)/i);
    const beneficios = extraerLista(text, /BENEFICIOS INCLUIDOS/i);
    const exclusiones = extraerLista(text, /EXCLUSIONES/i);

    const resultado = {
      tipoSeguro,
      cobertura,
      precio,
      beneficios,
      exclusiones,
    };

    res.json({ resultado });
  } catch (err) {
    res.status(500).json({ error: 'Error procesando archivo' });
  } finally {
    fs.unlink(filePath, () => {});
  }
});

function extraerValor(texto, regex) {
  const match = texto.match(regex);
  return match ? match[1].trim() : '';
}

function extraerLista(texto, titulo) {
  const lines = texto.split('\n');
  const index = lines.findIndex((line) => line.toLowerCase().includes(titulo.toLowerCase()));
  if (index === -1) return [];
  const result = [];
  for (let i = index + 1; i < lines.length; i++) {
    if (lines[i].startsWith('-')) result.push(lines[i].substring(1).trim());
    else if (lines[i].trim() === '') break;
  }
  return result;
}

module.exports = router;
