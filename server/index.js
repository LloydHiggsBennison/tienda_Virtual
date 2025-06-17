require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true })); // NECESARIO para recibir token_ws
app.use(express.json());

// Rutas
const productRoutes = require('./routes/products');
const webpayRoutes = require('./routes/webpay');

app.use('/api/products', productRoutes);
app.use('/api/webpay', webpayRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('✅ Servidor corriendo en http://localhost:5000');
    });
  })
  .catch(err => console.error('❌ Error al conectar con MongoDB:', err));
