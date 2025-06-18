const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  imagen: String,
  stock: Number
}, { collection: 'products' }); // 👈 clave aquí

module.exports = mongoose.model('Products', productoSchema);
