const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Rutas
const authRoutes = require("./routes/auth");
const segurosRoutes = require("./routes/seguros");
const recomendacionesRoutes = require("./routes/recomendaciones");
const polizasRoutes = require("./routes/polizas");
const contactoRoutes = require("./routes/contacto");

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/aiseguros")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error al conectar MongoDB", err));

app.use("/api/auth", authRoutes);
app.use("/api/seguros", segurosRoutes);
app.use("/api/recomendaciones", recomendacionesRoutes);
app.use("/api/polizas", polizasRoutes);
app.use("/api/contacto", contactoRoutes);

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
