require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ---------------------------
// Middleware
// ---------------------------
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---------------------------
// Rutas de Productos 
// ---------------------------
const oldProductRoutes = require('./routes/products');
app.use('/api/products', oldProductRoutes);

// ---------------------------
// ✅ CRUD Productos NUEVO (ID incremental, imagen, stock, precio)
// ---------------------------
const newProductRoutes = require('./routes/products'); // ⚠️ usa plural
app.use('/api/productos', newProductRoutes);

// ---------------------------
// ✅ Transacciones (historial de ventas + exportar PDF)
// ---------------------------
const transaccionesRoutes = require('./routes/transacciones');
app.use('/api/transacciones', transaccionesRoutes);

// ---------------------------
// ✅ Webpay Plus (crear + confirmar transacción)
// ---------------------------
const webpayRoutes = require('./routes/webpay');
app.use('/api/webpay', webpayRoutes);

// ---------------------------
// ✅ Clientes (guardar sesión Google/email)
// ---------------------------
const clientesRoutes = require('./routes/clientes');
app.use('/api/clientes', clientesRoutes);

// ---------------------------
// Test simple en consola node
// ---------------------------
app.get('/api/test', (req, res) => {
  res.send('✅ Servidor funcionando correctamente');
});

// ---------------------------
// Conexión a MongoDB
// ---------------------------
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/Tienda')
  .then(() => {
    app.listen(5000, () => {
      console.log('✅ Servidor corriendo en http://localhost:5000');
    });
  })
  .catch(err => console.error('❌ Error al conectar con MongoDB:', err));

// ✅ NO EXPORTES NADA AQUÍ — todo funciona desde app.listen
