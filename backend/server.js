const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const apiRoutes = require('./routes/api');

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor backend corriendo en http://localhost:${port}`);
  });
}

module.exports = app;
