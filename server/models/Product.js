const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  id: { type: Number, unique: true },  // Importante para el ID incremental en mongo
  nombre: String,
  descripcion: String,
  precio: Number,
  stock: Number,
  imagen: String  
}, { collection: 'products' });

module.exports = mongoose.model('Producto', productoSchema);
