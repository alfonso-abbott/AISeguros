const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Seguro = require("./models/Seguro");
const defaultSeguros = require("./utils/mockSeguros");

dotenv.config();

const app = express();
let port = process.env.PORT ? Number(process.env.PORT) : 5004;

// Rutas
const authRoutes = require("./routes/auth");
const segurosRoutes = require("./routes/seguros");
const recomendacionesRoutes = require("./routes/recomendaciones");
const polizasRoutes = require("./routes/polizas");
const polizaComparar = require("./routes/polizaComparar");
const contactoRoutes = require("./routes/contacto");
const usersRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/aiseguros")
  .then(async () => {
    console.log("MongoDB conectado");
    const count = await Seguro.countDocuments();
    if (count === 0) {
      await Seguro.insertMany(defaultSeguros);
      console.log("Seguros iniciales insertados");
    }
  })
  .catch((err) => console.error("Error al conectar MongoDB", err));

app.use("/api/auth", authRoutes);
app.use("/api/seguros", segurosRoutes);
app.use("/api/recomendaciones", recomendacionesRoutes);
app.use("/api/polizas", polizasRoutes);
app.use("/api/polizas", polizaComparar);
app.use("/api/contacto", contactoRoutes);
app.use("/api/users", usersRoutes);

function start(p) {
  const server = app
    .listen(p, () => {
      port = p;
      console.log(`Servidor backend corriendo en http://localhost:${p}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Puerto ${p} en uso, intentando ${p + 1}`);
        start(p + 1);
      } else {
        console.error("Error al iniciar servidor", err);
      }
    });
}

start(port);
