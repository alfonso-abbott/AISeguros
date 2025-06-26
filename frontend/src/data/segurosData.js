const tipos = ["auto", "vida", "mascotas", "salud", "viajes", "hogar"]; 
let id = 1; 
const seguros = []; 
tipos.forEach(tipo => {
  for (let i = 1; i <= 20; i++) {
    seguros.push({
      id: id++,
      tipo,
      nombre: `Seguro ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} ${i}`,
      cobertura: ["basica", "amplia", "total"][i % 3],
      precio: 150000 + i * 5000,
      descripcion: `Cobertura completa para ${tipo}, plan ${i}.`,
      beneficios: ["Asistencia 24/7", "Cobertura internacional", "Atención preferente"],
      exclusiones: ["Uso comercial", "Eventos extremos"],
      contacto: {
        telefono: "+56987654321",
        correo: "contacto@aiseguros.cl"
      }
    });
  }
});
export default seguros;
