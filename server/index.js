require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const webpayRoutes = require('./routes/webpay');
app.use('/api/webpay', webpayRoutes);

app.get('/api/test', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test')
  .then(() => {
    app.listen(5000, () => {
      console.log('✅ Servidor corriendo en http://localhost:5000');
    });
  })
  .catch(err => console.error('❌ Error al conectar con MongoDB:', err));
