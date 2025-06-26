import { BENEFICIOS_POSIBLES, EXCLUSIONES_POSIBLES } from './filtrosOpciones.js';

const tipos = ["auto", "vida", "mascotas", "salud", "viajes", "hogar"];
let id = 1;
const seguros = [];

function sample(list, count) {
  const selected = new Set();
  while (selected.size < count) {
    const item = list[Math.floor(Math.random() * list.length)];
    selected.add(item);
  }
  return Array.from(selected);
}

tipos.forEach(tipo => {
  for (let i = 1; i <= 30; i++) {
    seguros.push({
      id: id++,
      tipo,
      nombre: `Seguro ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${i}`,
      cobertura: ["basica", "amplia", "total"][i % 3],
      precio: 150000 + i * 5000,
      descripcion: `Cobertura completa para ${tipo}, plan ${i}.`,
      beneficios: sample(BENEFICIOS_POSIBLES, 3),
      exclusiones: sample(EXCLUSIONES_POSIBLES, 3),
      contacto: {
        telefono: "+56987654321",
        correo: "contacto@aiseguros.cl"
      }
    });
  }
});

export default seguros;
