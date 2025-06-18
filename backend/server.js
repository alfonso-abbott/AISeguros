const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const insuranceRoutes = require('./routes/insurance');
const policyRoutes = require('./routes/policy');
const usuariosRoutes = require('./routes/usuarios');
const segurosRoutes = require('./routes/seguros');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/policy', policyRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/seguros', segurosRoutes);

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
